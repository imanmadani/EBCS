import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FinancialexpertService {
  private FinancialexpertbaseUrl:any;
  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.FinancialexpertbaseUrl = 'http://localhost/api/' + 'FinancialExpert_api.php/';

  }
  getFinancialExpert(): Observable<any> {
    return this.http.get<any>(this.FinancialexpertbaseUrl + '?api=Get');
  }
  getFinancialExpertById(entity): Observable<any> {
    return this.http.get<any>(this.FinancialexpertbaseUrl + '?api=GetById&Id='+entity);
  }
  FinancialExpertcreate(entity): Observable<any> {
    return this.http
      .post<any>(this.FinancialexpertbaseUrl+'?api=Create', entity);
  }
  FinancialExpertedit(entity): Observable<any> {
    return this.http
      .put<any>(this.FinancialexpertbaseUrl+'?api=Update', entity);
  }
  FinancialExpertdelete(entity): Observable<any> {
    return this.http
      .post<any>(this.FinancialexpertbaseUrl+'?api=Delete', entity);
  }
  FinancialExpertAccept(entity): Observable<any> {
    return this.http
      .post<any>(this.FinancialexpertbaseUrl+'?api=AcceptPay', entity);
  }
  getFinancialExpertTask(): Observable<any> {
    return this.http.get<any>(this.FinancialexpertbaseUrl + '?api=GetFinancialExpertsTask');
  }
}
