import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedataService {
  private BoothBuilderInfringementsbaseUrl:any;
  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.BoothBuilderInfringementsbaseUrl = 'http://localhost/api/' + 'BoothBuilderInfringement_api.php/';

  }
  getBoothBuilderInfringement(): Observable<any> {
    return this.http.get<any>(this.BoothBuilderInfringementsbaseUrl + '?api=Get');
  }
  getBoothBuilderInfringementById(entity): Observable<any> {
    return this.http.get<any>(this.BoothBuilderInfringementsbaseUrl + '?api=GetById&Id='+entity);
  }
  BoothBuilderInfringementcreate(entity): Observable<any> {
    return this.http
      .post<any>(this.BoothBuilderInfringementsbaseUrl+'?api=Create', entity);
  }
  BoothBuilderInfringementedit(entity): Observable<any> {
    return this.http
      .put<any>(this.BoothBuilderInfringementsbaseUrl+'?api=Update', entity);
  }
  BoothBuilderInfringementdelete(entity): Observable<any> {
    return this.http
      .post<any>(this.BoothBuilderInfringementsbaseUrl+'?api=Delete', entity);
  }
  BoothBuilderInfringementQuantityTypeDropDown(): Observable<any> {
    return this.http.get<any>(this.BoothBuilderInfringementsbaseUrl+'?api=QuantityTypeDropDown');
  }
}
