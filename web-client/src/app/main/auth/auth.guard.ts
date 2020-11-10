import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// implements CanActivate
export class AuthGuard  {
  // constructor(private  router: Router) {
  // }

  // canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): boolean {
    // if (localStorage.getItem('token') !== null) {
    //   return true;
    // } else {
    //   this.router.navigateByUrl('/login');
    //   return false;
    // }
  // }

}
