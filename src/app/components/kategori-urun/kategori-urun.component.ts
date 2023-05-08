import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sepet } from 'src/app/models/Sepet';
import { Urun } from 'src/app/models/Urun';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kategori-urun',
  templateUrl: './kategori-urun.component.html',
  styleUrls: ['./kategori-urun.component.css']
})
export class KategoriUrunComponent implements OnInit {
  urunler: Urun[];
  kategoriId: number;
  constructor(
    public route: ActivatedRoute,
    public api: ApiService,
    public alert: AlertService,
  ) {
    
   }

  ngOnInit() {
    this.route.params.subscribe((d: any) => {
      this.kategoriId = d.katId
    })
    this.UrunlerGetir();
  }
  UrunlerGetir(){
    this.api.UrunByKatId(this.kategoriId).subscribe(d => {
      this.urunler = d;
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
}
