import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminKategoriComponent } from './components/Admin/admin-kategori/admin-kategori.component';
import { AdminUrunComponent } from './components/Admin/admin-urun/admin-urun.component';
import { AdminUyeComponent } from './components/Admin/admin-uye/admin-uye.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UrunDialogComponent } from './components/dialogs/urun-dialog/urun-dialog.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { ApiService } from './services/api.service';
import { AlertService } from './services/alert.service';
import { ProfileComponent } from './components/profile/profile.component';
import { KategoriUrunComponent } from './components/kategori-urun/kategori-urun.component';
import { SepetComponent } from './components/sepet/sepet.component';
import { SepetDialogComponent } from './components/dialogs/sepet-dialog/sepet-dialog.component';
import { UrunDetayComponent } from './components/urun-detay/urun-detay.component';
import { YorumDialogComponent } from './components/dialogs/yorum-dialog/yorum-dialog.component';
import { AuthInterceptor } from './services/AuthInterceptor';
import { AuthGuard } from './services/AuthGuard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    LoginComponent,
    RegisterComponent,
    AdminKategoriComponent,
    AdminUrunComponent,
    AdminUyeComponent,
    ProfileComponent,
    KategoriUrunComponent,
    SepetComponent,
    UrunDetayComponent,


    //Dialogs
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    UrunDialogComponent,
    UyeDialogComponent,
    SepetDialogComponent,
    YorumDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    UrunDialogComponent,
    UyeDialogComponent,
    SepetDialogComponent,
    YorumDialogComponent
  ],
  providers: [ApiService, AlertService, AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
