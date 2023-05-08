import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminKategoriComponent } from './components/Admin/admin-kategori/admin-kategori.component';
import { AdminUyeComponent } from './components/Admin/admin-uye/admin-uye.component';
import { AdminUrunComponent } from './components/Admin/admin-urun/admin-urun.component';
import { ProfileComponent } from './components/profile/profile.component';
import { KategoriUrunComponent } from './components/kategori-urun/kategori-urun.component';
import { SepetComponent } from './components/sepet/sepet.component';
import { UrunDetayComponent } from './components/urun-detay/urun-detay.component';
import { AuthGuard } from './services/AuthGuard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin-kategori',
    component: AdminKategoriComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'admin-uye',
    component: AdminUyeComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'admin-urun',
    component: AdminUrunComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ['Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'profile/:uyeId',
    component: ProfileComponent
  },
  {
    path: 'kategoriurun/:katId',
    component: KategoriUrunComponent
  },
  {
    path: 'sepet/:uyeId',
    component: SepetComponent
  },
  {
    path: 'urun-detay/:urunId',
    component: UrunDetayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
