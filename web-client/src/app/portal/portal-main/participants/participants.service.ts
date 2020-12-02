import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  private HalladminbaseUrl:any;
  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.HalladminbaseUrl = 'http://localhost/api/' + 'ParticipantAdmin_api.php/';

  }
  getByUser(): Observable<any> {
    return this.http.get<any>(this.HalladminbaseUrl + '?api=GetByUser');
  }
}
