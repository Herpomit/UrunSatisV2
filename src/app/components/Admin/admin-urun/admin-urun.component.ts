import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Urun } from 'src/app/models/Urun';
import { ApiService } from 'src/app/services/api.service';
import { UrunDialogComponent } from '../../dialogs/urun-dialog/urun-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-admin-urun',
  templateUrl: './admin-urun.component.html',
  styleUrls: ['./admin-urun.component.css']
})
export class AdminUrunComponent implements OnInit {
  urunler!: Urun[];
  dataSource: any;
  displayedColumns = ['urunAdi', 'urunFiyat', 'urunStok', 'urunTarih', 'Islemler']
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dialogRef!: MatDialogRef<UrunDialogComponent>
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>
  constructor(
    public api: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.UrunListele();
  }
  UrunListele() {
    this.api.UrunListele().subscribe((d: Urun[]) => {
      this.urunler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  Ekle() {
    var yeniKayit: Urun = new Urun();
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '500px',
      height: '680px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      d.urunTarih = Date.now().toString();
      if (d) {
        this.api.UrunEkle(d).subscribe((s: any) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        })
      }
    })
  }
  Duzenle(urun: Urun) {
    console.log(urun);
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '500px',
      height: '680px',
      data: {
        kayit: urun,
        islem: 'duzenle'
      }
    })
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.urunId = urun.urunId
        this.api.UrunDuzenle(d).subscribe((s: any) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        })
      }
    })
  }
  Sil(urun: Urun) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      height: '230px',
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = urun.urunAdi + " adlı Kategori Silinecektir Onaylıyor musunuz?";

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.api.UrunSil(urun.urunId).subscribe((s: any) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        })
      }
    })
  }
}