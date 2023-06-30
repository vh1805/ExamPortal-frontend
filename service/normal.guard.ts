import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable( {
  providedIn:'root'
})
export class NormalGuard implements CanActivate {
  constructor(private login:LoginService,private router : Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.login.isLoggedIn() && this.login.getUserRole()=='NORMAL USER'){
      return true;
    }
    // window.location.href='/login';    
    this.router.navigate(['login']);
    return false;
  }
}
