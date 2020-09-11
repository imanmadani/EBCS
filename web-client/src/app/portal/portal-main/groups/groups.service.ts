import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  baseUrl: any;
  baseUrl2: any;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = 'http://localhost/api/' + 'Group_api.php/';
  }

  get(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=Get');
  }
}
