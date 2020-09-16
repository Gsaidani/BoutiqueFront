import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css']
})
export class ConfirmationPopupComponent implements OnInit {
  public confirmMessage:  "Veuillez confirmer votre demande !";
  constructor(public dialogRef: MatDialogRef<ConfirmationPopupComponent>) { }

  ngOnInit(): void {
  }
  
}
