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
    this.baseUrl = 'http://localhost/api/' + 'Guest_api.php/';
  }

  login(formData): Observable<any> {
    return this.http.post<any>(this.baseUrl + '?api=Login', formData);
  }
}
