import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TechnicalexpertsService {
  private TechnicalexpertbaseUrl:any;
  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.TechnicalexpertbaseUrl = 'http://localhost/api/' + 'TechnicalExpert_api.php/';

  }
  get(): Observable<any> {
    return this.http.get<any>(this.TechnicalexpertbaseUrl + '?api=Get');
  }
  getTechnicalExpertTask(entity): Observable<any> {
    return this.http.get<any>(this.TechnicalexpertbaseUrl + '?api=GetTechnicalExpertTask&TechnicalExpertId='+entity);
  }
  getById(entity): Observable<any> {
    return this.http.get<any>(this.TechnicalexpertbaseUrl + '?api=GetById&Id='+entity);
  }
  getPlanByBoothBoothbuilderId(entity): Observable<any> {
    return this.http.get<any>(this.TechnicalexpertbaseUrl + '?api=GetPlanByBoothBoothbuilderId&BoothBoothbuilderId='+entity);
  }
  create(entity): Observable<any> {
    return this.http
      .post<any>(this.TechnicalexpertbaseUrl+'?api=Create', entity);
  }
  edit(entity): Observable<any> {
    return this.http
      .put<any>(this.TechnicalexpertbaseUrl+'?api=Update', entity);
  }
  delete(entity): Observable<any> {
    return this.http
      .post<any>(this.TechnicalexpertbaseUrl+'?api=Delete', entity);
  }
  boothApprove(entity): Observable<any> {
    return this.http
      .post<any>(this.TechnicalexpertbaseUrl+'?api=BoothApprove', entity);
  }
  boothDisApprove(entity): Observable<any> {
    return this.http
      .post<any>(this.TechnicalexpertbaseUrl+'?api=BoothDisApprove', entity);
  }
}
