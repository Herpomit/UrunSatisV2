import { Component, OnInit } from '@angular/core';
import { Begen } from 'src/app/models/Begen';
import { Sepet } from 'src/app/models/Sepet';
import { Urun } from 'src/app/models/Urun';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  urunler!: Urun[];
  constructor(
    public api: ApiService,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.UrunListele();
  }

  UrunListele() {
    this.api.UrunSonEklenenler(5).subscribe((d: Urun[]) => {
      this.urunler = d;
    })
  }
  SepeteEkle(urunId: number, urunFiyat: number) {
    var sepet: Sepet = new Sepet();
    var uyeId = Number(localStorage.getItem('uyeId'));
    var adet = 1;
    sepet.uyeId = uyeId
    sepet.urunId = urunId
    sepet.Fiyat = urunFiyat
    sepet.Adet = adet
    this.api.SepetEkle(sepet).subscribe((d: any) => {
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
}
