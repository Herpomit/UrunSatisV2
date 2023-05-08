import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ApiService } from "./api.service";
import { AlertService } from "./alert.service";
import { Injectable } from "@angular/core";

@Injectable()

export class AuthGuard{
    constructor(
        public api : ApiService,
        public alert: AlertService,
        public router: Router
    ){

    }
    canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot){
        var yetkiler = route.data["yetkiler"] as Array<string>
        var gitUrl = route.data["gerigit"] as string
        if (!this.api.OturumKontrol() || !yetkiler || !yetkiler.length ) {
            this.router.navigate([gitUrl]);
            return false;
        }

        var sonuc: boolean = false;
        sonuc = this.api.yetkiKontrol(yetkiler);
        return sonuc;
    }
}