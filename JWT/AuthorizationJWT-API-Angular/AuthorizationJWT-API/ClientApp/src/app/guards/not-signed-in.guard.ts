import { AuthService } from './../services/auth-service/auth-service.';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Injectable({
    providedIn: 'root'
})
export class NotSignedInGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private notifier: NotifierService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.check(state.url);
    }

    check(url: string): boolean {
        const isSignedIn = this.authService.isSignedIn();
        if (!isSignedIn) {
            return true;
        }
        else {
            this.router.navigate(['/']);
            this.notifier.notify('error', 'You are alredy signed in');
        }
    }
}