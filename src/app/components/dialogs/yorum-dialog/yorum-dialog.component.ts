import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { UrunDialogComponent } from '../urun-dialog/urun-dialog.component';
import { Yorum } from 'src/app/models/Yorum';

@Component({
  selector: 'app-yorum-dialog',
  templateUrl: './yorum-dialog.component.html',
  styleUrls: ['./yorum-dialog.component.css']
})
export class YorumDialogComponent implements OnInit {
  yeniKayit!: Yorum;
  frm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UrunDialogComponent>,
    public frmBuild:FormBuilder,
    public api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      urunStok: this.yeniKayit.yorumIcerik,
    })
  }
}
