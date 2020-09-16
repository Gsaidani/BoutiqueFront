import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/models.component';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ConfirmationPopupComponent } from 'src/app/toolsComponents/confirmation-popup/confirmation-popup.component';
import { ModifyUserModaleComponent } from '../modify-user-modale/modify-user-modale.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  @Input() colonnesTableauUser: string[];
  @Input() userData: MatTableDataSource<User>;
  @Output() canceledUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() modifiedUser: EventEmitter<any> = new EventEmitter<any>();

  constructor(public cancelPopup: MatDialog,private dialog: MatDialog) { 
   
  }

  ngOnInit(): void {
        
    //console.log("userData : ", this.userData);
  }

  ngOnChange(){
    console.log("userData : ", this.userData);
  }

  

  
  onDeleteUser(event : any, user: User) {

    // On ouvre la popup de confirmation
    const cancelPopupRef = this.cancelPopup.open(ConfirmationPopupComponent, {
      width: "500px",
      data: { confirm: false }
    });

    // Quand la popup est dismiss
    cancelPopupRef.afterClosed().subscribe(result => {
      // Si on a une réponse du callback modale et qu'il est positif (si l'utilisateur a cliqué sur Oui)
      if (result) {
        this.canceledUser.emit(user);
      }
    });
  }
 
  openDialogModification(user: User): void {
    const dialogRef = this.dialog.open(ModifyUserModaleComponent, {
      width: '500px',
      data: {
          quantite: 0
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    //   vente.quantite=result.quantite
    //  this.modifiedQuantite.emit(vente);
    });

  }

}
