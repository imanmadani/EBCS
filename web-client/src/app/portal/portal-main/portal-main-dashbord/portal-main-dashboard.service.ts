import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigModel} from "../../../configEntity";

@Injectable({
  providedIn: 'root'
})
export class PortalMainDashboardService {
  private baseUrl: any;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    let config = new ConfigModel();
    this.baseUrl = config.ServerAddress + 'Share_api.php/';

  }

  getLatestCurrency(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetLatestCurrency');
  }

  getLatestExhibitions(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetLatestExhibition');
  }
}
