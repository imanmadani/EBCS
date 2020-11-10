import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PortalMainDashboardService {
  private baseUrl: any;
  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = 'http://localhost/api/' + 'Share_api.php/';

  }

  getLatestCurrency(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetLatestCurrency');
  }
  getLatestExhibitions(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetLatestExhibition');
  }
}
