import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from "./shared/auth.service";
import {Observable} from "rxjs";


@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        console.log(this.authService.getUser());

        //if a user is logged in
        if (this.authService.getUser())
            return true;

        /*
        //admin privileges
        //if (this.authService.getUser() && this.authService.getUser().level == 1){

        }
        */

        this.router.navigate(['/login']);
        return false;
    }
}
