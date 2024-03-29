import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigModel} from "../../../configEntity";

@Injectable({
  providedIn: 'root'
})
export class SharedataService {
  private BoothBuilderInfringementsbaseUrl: any;
  private exchangeRatebaseUrl: any;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    let config = new ConfigModel();
    this.BoothBuilderInfringementsbaseUrl = config.ServerAddress + 'BoothBuilderInfringement_api.php/';
    this.exchangeRatebaseUrl = config.ServerAddress + 'ExchangeRate_api.php/';

  }

  getBoothBuilderInfringement(): Observable<any> {
    return this.http.get<any>(this.BoothBuilderInfringementsbaseUrl + '?api=Get');
  }

  getBoothBuilderInfringementById(entity): Observable<any> {
    return this.http.get<any>(this.BoothBuilderInfringementsbaseUrl + '?api=GetById&Id=' + entity);
  }

  BoothBuilderInfringementcreate(entity): Observable<any> {
    return this.http
      .post<any>(this.BoothBuilderInfringementsbaseUrl + '?api=Create', entity);
  }

  BoothBuilderInfringementedit(entity): Observable<any> {
    return this.http
      .put<any>(this.BoothBuilderInfringementsbaseUrl + '?api=Update', entity);
  }

  BoothBuilderInfringementdelete(entity): Observable<any> {
    return this.http
      .post<any>(this.BoothBuilderInfringementsbaseUrl + '?api=Delete', entity);
  }

  BoothBuilderInfringementQuantityTypeDropDown(): Observable<any> {
    return this.http.get<any>(this.BoothBuilderInfringementsbaseUrl + '?api=QuantityTypeDropDown');
  }

  getExchangeRate(): Observable<any> {
    return this.http.get<any>(this.exchangeRatebaseUrl + '?api=Get');
  }

  getExchangeRateByDate(): Observable<any> {
    return this.http.get<any>(this.exchangeRatebaseUrl + '?api=GetByDate');
  }

  createExchangeRate(entity): Observable<any> {
    return this.http
      .post<any>(this.exchangeRatebaseUrl + '?api=Create', entity);
  }

  blockExchangeRate(entity): Observable<any> {
    return this.http
      .post<any>(this.exchangeRatebaseUrl + '?api=Block', entity);
  }
}
