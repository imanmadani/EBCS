import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, from} from "rxjs";
import {GroupModel} from './entity';
@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  baseUrl: any;
  baseUrl2: any;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = 'http://localhost:8383/api/' + 'Group_api.php/';
  }

  get(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=Get');
  }
  getById(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetById&Id='+entity);
  }
  create(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=Create', entity);
  }
  edit(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=Edit', entity);
  }
  delete(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=Delete', entity);
  }
}
