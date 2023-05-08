import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uye } from 'src/app/models/Uye';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  yeni: Uye = new Uye();
  sonuc: Sonuc = new Sonuc();
  islem!: boolean;
  constructor(
    public api: ApiService,
    public alert: AlertService
  ) { }

  ngOnInit() {
  }

  KayitOl(adsoyad: string, kadi: string, parola: string, email: string) {
    this.yeni.Adsoyad = adsoyad;
    this.yeni.KullaniciAdi = kadi;
    this.yeni.Sifre = parola;
    this.yeni.Email = email;
    this.yeni.uyeAdmin = 0;
    this.api.UyeKayit(this.yeni).subscribe((d:any) => {
      console.log(d);
      if (d.islem) {
        this.api.tokenAl(kadi, parola).subscribe((d: any) => {
          localStorage.setItem("token", d.access_token)
          localStorage.setItem("uyeId", d.uyeId)
          localStorage.setItem("kadi", d.Kadi)
          localStorage.setItem("uyeYetkileri", d.uyeYetkileri)
          location.href = "/"
        }, err => {
          var s: Sonuc = new Sonuc();
          s.islem = false;
          s.mesaj = "Kullanıcı Adı ve ya Parola Geçersiz!"
          this.alert.AlertUygula(s)
        })
      } else {
        this.alert.AlertUygula(d);
      }
    })
  }
}
