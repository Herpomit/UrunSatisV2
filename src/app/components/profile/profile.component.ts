import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Begen } from 'src/app/models/Begen';
import { Uye } from 'src/app/models/Uye';
import { UyeFoto } from 'src/app/models/uyeFoto';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uyeId!: number;
  secUye!: Uye;
  foto1: string;
  secilenFoto: any;
  begeniler: Begen[];
  dataSource:any;
  displayedColumns: ['urunAdi', 'urunFiyat']
  uyeFoto: UyeFoto = new UyeFoto();
  frm: FormGroup = new FormGroup({
    KullaniciAdi: new FormControl(),
    Email: new FormControl(),
    Sifre: new FormControl(),
    Adsoyad: new FormControl(),
    Foto: new FormControl(),
    uyeAdmin: new FormControl()
  });
  constructor(
    public route: ActivatedRoute,
    public api: ApiService,
    public alert: AlertService,
    public frmBuild: FormBuilder
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((d: any) => {
      this.uyeId = d.uyeId
    })
    this.UyeGetir();
    this.BegenGetir();
  }
  BegenGetir(){
    this.api.BegenListeleByUyeId(this.uyeId).subscribe((d:Begen[]) => {
      this.begeniler = d;
      console.log(d);
      this.dataSource = new MatTableDataSource(d);
    })
  }
  UyeGetir() {
    this.api.UyeById(this.uyeId).subscribe((d: Uye) => {
      this.foto1 = d.Foto
      this.frm.patchValue({ ...d });
    })
  }
  FotoSec(e: any) {
    var fotolar = e.target.files
    var foto = fotolar[0]

    var fr = new FileReader();
    fr.onloadend = () => {
      this.secilenFoto = fr.result;
      this.uyeFoto.uyeId = this.uyeId
      this.uyeFoto.fotoData = fr.result.toString();
      this.uyeFoto.fotoUzanti = foto.type;
      this.api.UyeFotoGuncelle(this.uyeFoto).subscribe((d: any) => {
        this.alert.AlertUygula(d);
        if (d.islem) {
          this.UyeGetir();
        }
      })
    };
    fr.readAsDataURL(foto);
  }
  UyeGuncelle(){
    this.secUye = this.frm.value;
    this.secUye.uyeId = this.uyeId
    this.api.UyeDuzenle(this.secUye).subscribe((d:any) => {
      this.alert.AlertUygula(d);
      if (d.islem) {
          this.UyeGetir();
      }
    })
  }
  Sil(begenId: number){
    this.api.BegenSil(begenId).subscribe((d:any)=> {
      this.alert.AlertUygula(d);
      if (d.islem) {
        this.BegenGetir();
      }
    })
  }
  
}
