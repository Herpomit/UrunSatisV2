import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Sepet } from 'src/app/models/Sepet';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { SepetDialogComponent } from '../dialogs/sepet-dialog/sepet-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-sepet',
  templateUrl: './sepet.component.html',
  styleUrls: ['./sepet.component.css']
})
export class SepetComponent implements OnInit {
  uyeId: number;
  sepetUrunler: Sepet[];
  toplam: number = 0;
  dataSource: any;
  displayedColumns = ['urunAdi', 'urunFiyat', 'Adet', 'Islemler']
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>
  matDialogRef: MatDialogRef<SepetDialogComponent>
  constructor(
    public route: ActivatedRoute,
    public api: ApiService,
    public alert: AlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe((d: any) => {
      this.uyeId = d.uyeId
    })
    this.SepetGetir();
  }
  SepetGetir() {
    this.api.SepetListeByUyeId(this.uyeId).subscribe(d => {
      this.sepetUrunler = d;
      for (let index = 0; index < this.sepetUrunler.length; index++) {
        const element = this.sepetUrunler[index];
        this.toplam = element.urunBilgi.urunFiyat + this.toplam
      }
      this.dataSource = new MatTableDataSource(d);
    })
  }
  SatinAl() {
    this.matDialogRef = this.matDialog.open(SepetDialogComponent, {
      width: '450px',
      height: '530px',
      data: this.toplam
    });
    this.matDialogRef.afterClosed().subscribe(s=> {
      this.api.SepetTemizle(this.uyeId).subscribe((d:any)=> {
        if (d.islem) {
            this.alert.AlertUygula(d);
            this.SepetGetir();
        }
      })
    })
  }
  Sil(sepet: Sepet) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      height: '230px',
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = sepet.urunBilgi.urunAdi + " adlı Ürün Sepetten Kaldırılacak Onaylıyor musunuz?";

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.api.SepetSil(sepet.sepetId).subscribe((s: any) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SepetGetir();
          }
        })
      }
    })
  }
}
