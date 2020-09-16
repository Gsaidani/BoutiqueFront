import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produit } from 'src/app/models/models.component';


@Component({
  selector: 'app-new-produit-modale',
  templateUrl: './new-produit-modale.component.html',
  styleUrls: ['./new-produit-modale.component.css']
})
export class NewProduitModaleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewProduitModaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produit) { }

  ngOnInit(): void {
    console.log(this.data)
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
