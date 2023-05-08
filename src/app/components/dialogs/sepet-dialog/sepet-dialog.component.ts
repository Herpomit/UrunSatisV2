import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sepet-dialog',
  templateUrl: './sepet-dialog.component.html',
  styleUrls: ['./sepet-dialog.component.css']
})
export class SepetDialogComponent implements OnInit {
  toplamMiktar: number = 0;
  constructor(
    public dialogRef: MatDialogRef<SepetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.toplamMiktar = data;
  }

  ngOnInit() {
  }

}
