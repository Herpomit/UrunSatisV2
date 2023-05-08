import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Kategori } from 'src/app/models/Kategori';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  kadi: string;
  uyeId: number | any;
  kategoriler!: Kategori[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    public api: ApiService) { }


  ngOnInit(): void {
    this.KategoriListe();
    if (this.api.OturumKontrol()) {
      this.kadi = localStorage.getItem("kadi")!
    }
    if (this.api.OturumKontrol()) {
      this.uyeId =  localStorage.getItem("uyeId")
    }
  }

  KategoriListe(){
    this.api.KategoriListele().subscribe((d:Kategori[]) => {
      this.kategoriler = d;
    })
  }
  OturumKapat() {
    localStorage.clear();
    location.href = "/";
  }

}
