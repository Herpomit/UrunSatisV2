import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Kategori } from 'src/app/models/Kategori';

@Component({
  selector: 'app-kategori-dialog',
  templateUrl: './kategori-dialog.component.html',
  styleUrls: ['./kategori-dialog.component.css']
})
export class KategoriDialogComponent implements OnInit {
  dialogBaslik!:string;
  yeniKayit!: Kategori;
  islem!: string;
  frm!:FormGroup;

  constructor(
    public dialogRef: MatDialogRef<KategoriDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.islem = data.islem;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Kategori Ekle"
      this.yeniKayit = new Kategori();
    } 
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Kategori Düzenle"
      this.yeniKayit = data.kayit;
    } 
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      kategoriAdi: this.yeniKayit.kategoriAdi
    });
  }

}
