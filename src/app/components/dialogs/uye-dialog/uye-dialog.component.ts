import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Urun } from 'src/app/models/Urun';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { UrunDialogComponent } from '../urun-dialog/urun-dialog.component';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.css']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik!: string;
  yeniKayit!: Uye;
  islem!: string;
  frm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UrunDialogComponent>,
    public frmBuild:FormBuilder,
    public api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.islem = data.islem;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Üye Ekle"
      this.yeniKayit = new Uye();
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Üye Düzenle"
      this.yeniKayit = data.kayit
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {}
  FormOlustur(){
    return this.frmBuild.group({
      KullaniciAdi: this.yeniKayit.KullaniciAdi,
      Email: this.yeniKayit.Email,
      Sifre: this.yeniKayit.Sifre,
      Adsoyad: this.yeniKayit.Adsoyad,
      uyeAdmin: this.yeniKayit.uyeAdmin
    });
  }
}
