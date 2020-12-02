import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
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
    this.showLoader();
    const token=localStorage.getItem('token');
    if(token){
    const authReq = req.clone({
      headers: req.headers.set('Token', localStorage.getItem('token'))
    });
    return next.handle(authReq).pipe(
      tap(
        (event: HttpEvent<any>) => {
          debugger
          if (event instanceof HttpResponse) {
            this.onEnd();
          }
        },
        error => {
          debugger
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
