import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-user-modale',
  templateUrl: './new-user-modale.component.html',
  styleUrls: ['./new-user-modale.component.css']
})
export class NewUserModaleComponent implements OnInit {
  isDisabled =true;
  constructor(public dialogRef: MatDialogRef<NewUserModaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  ngOnChange(){
    if(this.data.user.nom &&
       this.data.user.prenom && 
       this.data.user.identifiant && 
       this.data.user.password && 
       this.data.user.typeUser &&
       this.data.user.dateInscription ){
       this.isDisabled=false;
       }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
