import { Component, OnInit, ViewChild } from '@angular/core';
import { Uye } from 'src/app/models/Uye';
import { UyeDialogComponent } from '../../dialogs/uye-dialog/uye-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-admin-uye',
  templateUrl: './admin-uye.component.html',
  styleUrls: ['./admin-uye.component.css']
})
export class AdminUyeComponent implements OnInit {
  uyeler!: Uye[];
  dataSource: any;
  displayedColumns = ['KullaniciAdi','Email','Adsoyad','uyeAdmin','Islemler']
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dialogRef!: MatDialogRef<UyeDialogComponent>
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>
  constructor(
    public api: ApiService,
    public matDialog: MatDialog,
    public alert: AlertService
  ) { }

  ngOnInit() {
    this.UyeListele();
  }
  UyeListele() {
    this.api.UyeListele().subscribe((d: Uye[]) => {
      this.uyeler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  Ekle() {
    var yeniKayit: Uye = new Uye();
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: '500px',
      height: '600px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    })
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.api.UyeEkle(d).subscribe((s: any) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        })
      }
    });
  }
  Duzenle(uye: Uye) {
    this.dialogRef = this.matDialog.open(UyeDialogComponent,{
      width: '500px',
      height: '680px',
      data: {
        kayit: uye,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d:Uye) => {
      d.uyeId = uye.uyeId
      if (d) {
        this.api.UyeDuzenle(d).subscribe((s: any) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        })
      }
    });
  }
 Sil(uye: Uye){
  this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
    width: '450px',
      height: '230px',
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = uye.Adsoyad + " adlı Üye silinecektir Onaylıyor musunuz?"
    
    this.confirmDialogRef.afterClosed().subscribe(d=> {
      if (d) {
          this.api.UyeSil(uye.uyeId).subscribe((s:any) => {
            this.alert.AlertUygula(s)
            if (s.islem) {
                this.UyeListele();
            }
          })
      }
    })
  } 
}
