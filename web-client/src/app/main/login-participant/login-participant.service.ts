import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigModel} from "../../configEntity";

@Injectable({
  providedIn: 'root'
})
export class LoginParticipantService {
  baseUrl: any;
  baseUrl2: any;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    let config = new ConfigModel();
    this.baseUrl = config.ServerAddress + 'GuesParticipant_api.php/';
  }

  login(formData): Observable<any> {
    return this.http.post<any>(this.baseUrl + '?api=Login', formData);
  }
}
