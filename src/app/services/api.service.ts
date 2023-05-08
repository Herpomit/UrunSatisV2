import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kategori } from '../models/Kategori';
import { Urun } from '../models/Urun';
import { Uye } from '../models/Uye';
import { Yorum } from '../models/Yorum';
import { Sepet } from '../models/Sepet';
import { UyeFoto } from '../models/uyeFoto';
import { Begen } from '../models/Begen';
// 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = "https://localhost:44322/api/";
  public siteUrl: string = "https://localhost:44322/"
  constructor(
    public http: HttpClient
  ) { }


  tokenAl(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password"
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader })
  }

  OturumKontrol() {
    if (localStorage.getItem("token")) {
      return true
    } else {
      return false
    }
  }
  yetkiKontrol(yetkiler:string[]){
    var sonuc : boolean = false;

    var uyeYetkileri: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));
    if (uyeYetkileri) {
      yetkiler.forEach(element => {
        if (uyeYetkileri.indexOf(element) > -1) {
          sonuc = true;
          return false;
        }
        return false;
      })
    }
    return sonuc;
  }

  // Kategori Apileri
  KategoriListele() {
    return this.http.get<Kategori[]>(this.apiUrl + "kategoriliste")
  }
  KategoriById(katId: number) {
    return this.http.get<Kategori>(this.apiUrl + "kategoribyid/" + katId)
  }
  KategoriEkle(kat: Kategori) {
    return this.http.post(this.apiUrl + "kategoriekle", kat)
  }
  KategoriDuzenle(kat: Kategori) {
    return this.http.put(this.apiUrl + "kategoriduzenle", kat)
  }
  KategoriSil(katId: number) {
    return this.http.delete(this.apiUrl + "kategorisil/" + katId)
  }
  //Bitiş

  //Urun Api
  UrunListele() {
    return this.http.get<Urun[]>(this.apiUrl + "urunliste")
  }
  UrunSonEklenenler(s: number) {
    return this.http.get<Urun[]>(this.apiUrl + "urunlistesoneklenenler/"+s)
  }
  UrunByKatId(katId: number) {
    return this.http.get<Urun[]>(this.apiUrl + "urunbykatid/" + katId)
  }
  UrunById(urunId: number) {
    return this.http.get<Urun>(this.apiUrl + "urunbyid/" + urunId)
  }
  UrunEkle(urun: Urun) {
    return this.http.post(this.apiUrl + "urunekle", urun)
  }
  UrunDuzenle(urun: Urun) {
    return this.http.put(this.apiUrl + "urunduzenle", urun)
  }
  UrunSil(urunId: number) {
    return this.http.delete(this.apiUrl + "urunsil/" + urunId)
  }
  //Bitiş

  //Uye Apileri
  UyeListele() {
    return this.http.get<Uye[]>(this.apiUrl + "uyeliste")
  }
  UyeById(uyeId: number) {
    return this.http.get<Uye>(this.apiUrl + "uyebyid/" + uyeId)
  }
  UyeEkle(uye: Uye) {
    return this.http.post(this.apiUrl + "uyeekle", uye)
  }
  UyeFotoGuncelle(uye: UyeFoto) {
    return this.http.post(this.apiUrl + "fotoguncelle", uye)
  }
  UyeKayit(uye: Uye) {
    return this.http.post(this.apiUrl + "uyekayit", uye)
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiUrl + "uyeduzenle", uye)
  }
  UyeSil(uyeId: number) {
    return this.http.delete(this.apiUrl + "uyesil/" + uyeId)
  }
  //Bitiş

  //Yorum Apileri
  YorumListele() {
    return this.http.get<Yorum[]>(this.apiUrl + "yorumliste")
  }
  YorumListeByUyeId(uyeId: number) {
    return this.http.get<Yorum[]>(this.apiUrl + "yorumlistebyuyeid/" + uyeId)
  }
  YorumListeByUrunId(urunId: number) {
    return this.http.get<Yorum[]>(this.apiUrl + "yorumlistebyurunid/" + urunId)
  }
  YorumListeSonEklenenler(s: number) {
    return this.http.get<Yorum[]>(this.apiUrl + "yorumlistesoneklenenler/" + s)
  }
  YorumById(yorumId: number) {
    return this.http.get<Yorum>(this.apiUrl + "yorumbyid/" + yorumId)
  }
  YorumEkle(yorum: Yorum) {
    return this.http.post(this.apiUrl + "yorumekle", yorum)
  }
  YorumDuzenle(yorum: Yorum) {
    return this.http.put(this.apiUrl + "yorumduzenle", yorum)
  }
  YorumSil(yorumId: number) {
    return this.http.delete(this.apiUrl + "yorumsil/" + yorumId)
  }
  //Bitiş

  //Sepet Api
  SepetListeByUyeId(uyeId: number) {
    return this.http.get<Sepet[]>(this.apiUrl + "sepetlistebyuyeid/" + uyeId)
  }
  SepetEkle(sepet: Sepet) {
    return this.http.post(this.apiUrl+ "sepetekle", sepet)
  }
  SepetDuzenle(sepet:Sepet){
    return this.http.put(this.apiUrl+ "sepetduzenle", sepet)
  }
  SepetTemizle(uyeId: number){
    return this.http.delete(this.apiUrl+ "sepettemizle/"+ uyeId)
  }
  SepetSil(sepetId: number){
    return this.http.delete(this.apiUrl+ "sepetsil/"+ sepetId)
  }
  //Bitiş

  //Begen Api
  BegenListeleByUyeId(uyeId: number){
    return this.http.get<Begen[]>(this.apiUrl + "begenlistebyuyeid/"+ uyeId)
  }
  BegenEkle(begen:Begen){
    return this.http.post(this.apiUrl + "begenekle" , begen)
  }
  BegenTemizle(urunId: number){
    return this.http.delete(this.apiUrl + "begentemizle/"+ urunId)
  }
  BegenSil(begenId: number){
    return this.http.delete(this.apiUrl+ "begensil/" + begenId)
  }
  //Bitiş
}
