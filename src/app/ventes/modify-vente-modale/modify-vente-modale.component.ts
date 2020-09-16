import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modify-vente-modale',
  templateUrl: './modify-vente-modale.component.html',
  styleUrls: ['./modify-vente-modale.component.css']
})
export class ModifyVenteModaleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModifyVenteModaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }



}
