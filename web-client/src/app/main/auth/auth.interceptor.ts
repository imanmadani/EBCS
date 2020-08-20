import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UnAuthService} from './un-auth.service';
import {LoaderService} from '../../utilities/services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private  router: Router,
              private loaderService: LoaderService,
              public  unAuthotizeService: UnAuthService) {
  }

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
    this.showLoader();
    if (this.unAuthotizeService.isUnAuthorize === false  &&  localStorage.getItem('token') !== 'undefined') {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });
      return next.handle(clonedReq).pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.onEnd();
            }
          },
          error => {
            if (error.status === 401) {
              this.onEnd();
              localStorage.removeItem('token');
              this.router.navigateByUrl('/login');
            } else {
            }
          }
        )
      );
    } else {
      // this.onEnd();
      return next.handle(req.clone());
    }

  }
}
