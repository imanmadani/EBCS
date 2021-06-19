import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, from} from "rxjs";
import {GroupModel} from './entity';
import {ConfigModel} from "../../../configEntity";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  baseUrl: any;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    let config = new ConfigModel();
    this.baseUrl = config.ServerAddress + 'Group_api.php/';
  }

  get(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=Get');
  }

  getById(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetById&Id=' + entity);
  }

  create(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + '?api=Create', entity);
  }

  edit(entity: GroupModel): Observable<any> {
    return this.http
      .put<any>(this.baseUrl + '?api=Update', entity);
  }

  delete(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + '?api=Delete', entity);
  }

  getMenuWithAccess(model): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetMenuWithAccess&GroupId=' + model.Id);
  }

  setMenuAccess(model): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=SetMenuAccess&MenuId=' + model.MenuId + "&GroupId=" + model.GroupId);
  }

  deleteMenuAccess(model): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=DeleteMenuAccess' + "&Id=" + model.Id);
  }
}
