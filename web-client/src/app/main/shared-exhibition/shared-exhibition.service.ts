import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedExhibitionService {
  baseUrl: any;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = 'http://localhost/api/' + 'Guest_api.php/';
  }
  getExhibitionActive(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetExhibitionActive');
  }
  getBoothsByHall(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetBoothsByHall&ExhibitionHallId='+entity);
  }
}
