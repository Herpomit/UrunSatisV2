import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Sepet } from 'src/app/models/Sepet';
import { Sonuc } from 'src/app/models/Sonuc';
import { Urun } from 'src/app/models/Urun';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { YorumDialogComponent } from '../dialogs/yorum-dialog/yorum-dialog.component';
import { FormGroup } from '@angular/forms';
import { Yorum } from 'src/app/models/Yorum';
import { Begen } from 'src/app/models/Begen';

@Component({
  selector: 'app-urun-detay',
  templateUrl: './urun-detay.component.html',
  styleUrls: ['./urun-detay.component.css']
})
export class UrunDetayComponent implements OnInit {
  secUrun: Urun;
  secUrunId: number;
  s : Sonuc = new Sonuc();
  yorumlar: Yorum[];
  dialogRef!: MatDialogRef<YorumDialogComponent>
  constructor(
    public route: ActivatedRoute,
    public api: ApiService,
    public alert: AlertService,
    public matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((d: any) => {
      if (d) {
        this.secUrunId = d.urunId
      }
    })
    this.UrunGetir();
    this.YorumListele();
  }
  UrunGetir(){
    this.api.UrunById(this.secUrunId).subscribe((d:Urun) => {
      if (d) {
        this.secUrun = d;
      }
    })
  }
  SepeteEkle(urunId: number,urunFiyat: number){
    var sepet : Sepet = new Sepet();
    var uyeId = Number(localStorage.getItem('uyeId'));
    var adet = 1;
    sepet.uyeId = uyeId
    sepet.urunId = urunId
    sepet.Fiyat = urunFiyat
    sepet.Adet = adet
    this.api.SepetEkle(sepet).subscribe((d:any) => {
      this.alert.AlertUygula(d);
    })
  }
  Begen(urunId: number){
    var begen: Begen = new Begen();
    var uyeId = Number(localStorage.getItem('uyeId'))
    begen.urunId = urunId;
    begen.uyeId = uyeId;
    this.api.BegenEkle(begen).subscribe((d:any) => {
      this.alert.AlertUygula(d);
    })
  }
  YorumListele(){
    this.api.YorumListeByUrunId(this.secUrunId).subscribe(d => {
      this.yorumlar = d;
    })
  }
  YorumYap(){
    var yeniKayit : Yorum = new Yorum();
    this.dialogRef = this.matDialog.open(YorumDialogComponent, {
      width: '500px',
      height: '250px',
      data: {
        kayit: yeniKayit
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      yeniKayit.yorumIcerik = d;
      yeniKayit.uyeId = Number(localStorage.getItem('uyeId'));
      yeniKayit.urunId = this.secUrunId;
      yeniKayit.KullaniciAdi = localStorage.getItem('kadi')
      yeniKayit.Tarih = Date.now().toString();
      this.api.YorumEkle(yeniKayit).subscribe((s:any) => {
        if (s.islem) {
            this.alert.AlertUygula(s);
            this.YorumListele();
        }
      })
    })
  }

}
