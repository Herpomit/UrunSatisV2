import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Kategori } from 'src/app/models/Kategori';
import { Urun } from 'src/app/models/Urun';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-urun-dialog',
  templateUrl: './urun-dialog.component.html',
  styleUrls: ['./urun-dialog.component.css']
})
export class UrunDialogComponent implements OnInit {
  dialogBaslik!: string;
  yeniKayit!: Urun;
  islem!: string;
  kategoriler!: Kategori[];
  frm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UrunDialogComponent>,
    public frmBuild:FormBuilder,
    public api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Ürün Ekle"
      this.yeniKayit = new Urun();
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Ürün Düzenle"
      this.yeniKayit = data.kayit
    }
    this.frm = this.FormOlustur();
   }

  ngOnInit() {
    this.KategoriListele();
  }
  FormOlustur(){
    return this.frmBuild.group({
      urunAdi: this.yeniKayit.urunAdi,
      urunFiyat: this.yeniKayit.urunFiyat,
      urunStok: this.yeniKayit.urunStok,
      urunFoto: this.yeniKayit.urunFoto,
      urunTarih: this.yeniKayit.urunTarih,
      kategoriId: this.yeniKayit.kategoriId
    })
  }
  KategoriListele(){
    this.api.KategoriListele().subscribe((d: Kategori[]) => {
      this.kategoriler = d;
    })
  }
}
