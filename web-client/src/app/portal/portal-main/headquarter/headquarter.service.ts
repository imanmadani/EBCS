import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeadquarterService {
  private baseUrl:any;
  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = 'http://localhost/api/' + 'HeadQuarter_api.php/';

  }
  getHeadQuarter(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=Get');
  }
  getHeadQuarterById(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetById&Id='+entity);
  }
  HeadQuartercreate(entity): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=Create', entity);
  }
  HeadQuarteredit(entity): Observable<any> {
    return this.http
      .put<any>(this.baseUrl+'?api=Update', entity);
  }
  HeadQuarterdelete(entity): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=Delete', entity);
  }
  getHeadQuarterTask(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetTask');
  }
  HeadQuarterAccept(entity): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=Accept', entity);
  }
}
