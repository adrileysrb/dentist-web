import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "../service/authentication.service";
import { NotificationService } from "../service/notification.service";
import { NotificationType } from "../enum/notification-type.enum";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router, private notificationService: NotificationService) {} 

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.isUserLoggedIn();
    }

    isUserLoggedIn(): boolean {
        if(this.authenticationService.isUserLoggedIn()){
            return true;
        }
        this.router.navigate(['/login']);
        this.notificationService.notify(NotificationType.ERROR, `You need to log in to access this page`);
        return false;
    }

}