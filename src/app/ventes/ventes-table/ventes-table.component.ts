import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Vente } from 'src/app/models/models.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPopupComponent } from 'src/app/toolsComponents/confirmation-popup/confirmation-popup.component';
import { ModifyVenteModaleComponent } from '../modify-vente-modale/modify-vente-modale.component';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: 'app-ventes-table',
  templateUrl: './ventes-table.component.html',
  styleUrls: ['./ventes-table.component.css']
})
export class VentesTableComponent implements OnInit {
  @Input() colonnesTableauVentes: string[];
  @Input() venteData: MatTableDataSource<Vente>;
  @Output() numberArticleChoice = new EventEmitter<{}>();
  @Output() canceledVente: EventEmitter<Vente> = new EventEmitter<Vente>();
  @Output() modifiedQuantite: EventEmitter<any> = new EventEmitter<any>();
  
  totalVentesObs = new Subject<any>();
  totalVentes:number=0;
  inputQuantiteValue:any;
  constructor(public cancelPopup: MatDialog,private dialog: MatDialog) { 
    this.totalVentesObs
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.totalVentes=value;
      });
   
  }

  ngOnChanges(): void{
    this.totalVentes=0;
    this.venteData.forEach(element => {
      
      this.totalVentes+=(element.article.prixUnitaire*element.quantite)
      
    
    });

    this.totalVentesObs.next(this.totalVentes);

  }

  ngOnInit(): void {
        
    
  }

  // redirectToOriginal() {
  //   window.location.href = '/ventes';
    
  // }

  
  onDeleteVente(event : any, vente: Vente) {

    // On ouvre la popup de confirmation
    const cancelPopupRef = this.cancelPopup.open(ConfirmationPopupComponent, {
      width: "500px",
      data: { confirm: false }
    });

    // Quand la popup est dismiss
    cancelPopupRef.afterClosed().subscribe(result => {
      // Si on a une réponse du callback modale et qu'il est positif (si l'utilisateur a cliqué sur Oui)
      if (result) {
        this.canceledVente.emit(vente);
      }
    });
  }
 
  openDialogModification(vente: Vente): void {
    const dialogRef = this.dialog.open(ModifyVenteModaleComponent, {
      width: '500px',
      data: {
          quantite: 0
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      vente.quantite=result.quantite
     this.modifiedQuantite.emit(vente);
    });

  }

  ngOnDestroy() {
    this.totalVentesObs.unsubscribe();
  }

}
