import {Inject, Injectable} from '@angular/core';
import {HttpClient,HttpInterceptor } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: any;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = 'http://localhost/php-mvc-api/api/' + 'User_api.php/';
  }

  login(formData): Observable<any> {
    console.log(this.baseUrl);
    return this.http.post<any>(this.baseUrl + '?api=Login&token=1234&t=44&Username=imnmadani&Password=Aa123456', formData);
  }
}
