import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpInterceptor} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigModel} from "../../configEntity";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: any;
  baseUrl2: any;


  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    let config = new ConfigModel();
    this.baseUrl = config.ServerAddress + 'Guest_api.php/';
    this.baseUrl2 = config.ServerAddress + 'User_api.php/';
  }

  login(formData): Observable<any> {
    return this.http.post<any>(this.baseUrl + '?api=Login', formData);
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.baseUrl2 + '?api=Logout', {Id: '0'});
  }

  getUser(): Observable<any> {
    return this.http.get<any>(this.baseUrl2 + '?api=Get');
  }

  getUserByToken(): Observable<any> {

    return this.http.get<any>(this.baseUrl2 + '?api=GetByToken');
  }

  getMenu(): Observable<any> {
    return this.http.get<any>(this.baseUrl2 + '?api=GetMenuByUser');
  }
  forgetPass(entity): Observable<any> {
    return this.http.post<any>(this.baseUrl + '?api=ForgetPass',entity);
  }

}
