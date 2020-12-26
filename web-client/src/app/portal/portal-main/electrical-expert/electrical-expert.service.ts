import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ElectricalExpertService {
  private baseUrl:any;
  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = 'http://localhost/api/' + 'ElectricalExpert_api.php/';

  }
  getElectricalExpert(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=Get');
  }
  getElectricalExpertById(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetById&Id='+entity);
  }
  ElectricalExpertcreate(entity): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=Create', entity);
  }
  ElectricalExpertedit(entity): Observable<any> {
    return this.http
      .put<any>(this.baseUrl+'?api=Update', entity);
  }
  ElectricalExpertdelete(entity): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=Delete', entity);
  }
  getElectricalExpertTask(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetElectricalExpertsTask');
  }
  ElectricalExpertAccept(entity): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=Accept', entity);
  }
}
