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
    // this.showLoader();
    // if (this.unAuthotizeService.isUnAuthorize === false  &&  localStorage.getItem('token') ) {
    //   let clonedReq = req.clone();
    // if (localStorage.getItem('token')){
    //   if(clonedReq.body){
    //     clonedReq.body.token = localStorage.getItem('token');
    //   }else {
    //     clonedReq.body.push({'token':localStorage.getItem('token')});
    //
    //   }
    //   // clonedReq.body..set('token',localStorage.getItem('token'));
    // }
    // clonedReq.headers.append('token','1234');
    const authReq = req.clone({
      headers: req.headers.set('token', localStorage.getItem('token'))
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
          if (error.status === 401) {
            this.onEnd();
            localStorage.removeItem('token');
            this.router.navigateByUrl('/login');
          } else {
          }
        }
      )
    );
    // } else {
    //   // this.onEnd();
    //   return next.handle(req.clone());
    // }

  }
}
