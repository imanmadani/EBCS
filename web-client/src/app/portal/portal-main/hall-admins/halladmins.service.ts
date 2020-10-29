import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HalladminsService {
  private HalladminbaseUrl:any;
  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.HalladminbaseUrl = 'http://localhost/api/' + 'HallAdmin_api.php/';

  }
  getHallAdmin(): Observable<any> {
    return this.http.get<any>(this.HalladminbaseUrl + '?api=Get');
  }
  getHallAdminById(entity): Observable<any> {
    return this.http.get<any>(this.HalladminbaseUrl + '?api=GetById&Id='+entity);
  }
  HallAdmicreate(entity): Observable<any> {
    return this.http
      .post<any>(this.HalladminbaseUrl+'?api=Create', entity);
  }
  HallAdminedit(entity): Observable<any> {
    return this.http
      .put<any>(this.HalladminbaseUrl+'?api=Update', entity);
  }
  HallAdmindelete(entity): Observable<any> {
    return this.http
      .post<any>(this.HalladminbaseUrl+'?api=Delete', entity);
  }
  getHallAdminTask(): Observable<any> {
    return this.http.get<any>(this.HalladminbaseUrl + '?api=GetHallAdminsTask');
  }
}
