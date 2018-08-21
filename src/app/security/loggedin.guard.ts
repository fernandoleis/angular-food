import { CanLoad, Route, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService) { }

    checkAuthentication(path: string): boolean {
        const loggedin = this.loginService.isLoggedIn();
        console.log('route guard --> ' + JSON.stringify(path));
        if (!loggedin) {
            this.loginService.handleLogin(`/${path}`);
        }
        return loggedin;
    }

    canLoad(route: Route): boolean {
        console.log('canLoad');
        return this.checkAuthentication(route.path);
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        console.log('canActivate');
        return this.checkAuthentication(activatedRoute.routeConfig.path);
    }
}
