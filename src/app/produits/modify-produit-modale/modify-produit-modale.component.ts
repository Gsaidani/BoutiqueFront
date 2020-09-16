import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modify-produit-modale',
  templateUrl: './modify-produit-modale.component.html',
  styleUrls: ['./modify-produit-modale.component.css']
})
export class ModifyProduitModaleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModifyProduitModaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
