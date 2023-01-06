import { DialogData } from './../interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, Optional } from '@angular/core';

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrls: ['./confirm-deletion.component.scss']
})
export class ConfirmDeletionComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeletionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
