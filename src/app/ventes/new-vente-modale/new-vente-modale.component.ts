import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-vente-modale',
  templateUrl: './new-vente-modale.component.html',
  styleUrls: ['./new-vente-modale.component.css']
})
export class NewVenteModaleComponent implements OnInit {
  formDateVente = new FormGroup({
    dateVente: new FormControl('', null),
  });
  formArticleChoice = new FormGroup({
    articleChoisi: new FormControl('', null),
  });
  
  constructor(
    public dialogRef: MatDialogRef<NewVenteModaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
