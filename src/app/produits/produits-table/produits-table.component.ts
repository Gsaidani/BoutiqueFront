import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Produit } from 'src/app/models/models.component';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationPopupComponent } from 'src/app/toolsComponents/confirmation-popup/confirmation-popup.component';
import { ModifyProduitModaleComponent } from '../modify-produit-modale/modify-produit-modale.component';

@Component({
  selector: 'app-produits-table',
  templateUrl: './produits-table.component.html',
  styleUrls: ['./produits-table.component.css']
})
export class ProduitsTableComponent implements OnInit {
  @Input() colonnesTableauProduits: string[];
  @Input() produitData: MatTableDataSource<Produit>;
  @Output() newPrixUnitaire = new EventEmitter<{}>();
  @Output() canceledProduit: EventEmitter<Produit> = new EventEmitter<Produit>();
  @Output() modifiedPrice: EventEmitter<any> = new EventEmitter<any>();
  constructor(public cancelPopup: MatDialog,private dialog: MatDialog) { 
   
   
  }
  ngOnInit(): void {
   
    
  }

  onDeleteProduit(event : any, produit: Produit) {

    // On ouvre la popup de confirmation
    const cancelPopupRef = this.cancelPopup.open(ConfirmationPopupComponent, {
      width: "500px",
      data: { confirm: false }
    });

    // Quand la popup est dismiss
    cancelPopupRef.afterClosed().subscribe(result => {
      // Si on a une réponse du callback modale et qu'il est positif (si l'utilisateur a cliqué sur Oui)
      if (result) {
        this.canceledProduit.emit(produit);
      }
    });
  }
 
  openDialogModification(produit: Produit): void {
    const dialogRef = this.dialog.open(ModifyProduitModaleComponent, {
      width: '500px',
      data: {
          prix: 0
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      produit.prixUnitaire=result.prix
     this.modifiedPrice.emit(produit);
    });

  }

 

}
