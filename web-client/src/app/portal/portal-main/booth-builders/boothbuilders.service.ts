import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GroupModel} from "../groups/entity";

@Injectable({
  providedIn: 'root'
})
export class BoothbuildersService {
  baseUrl: any;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = 'http://localhost/api/' + 'BoothBuilder_api.php/';
  }

  get(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=Get');
  }
  getById(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetById&Id='+entity);
  }
  getBoothBuilderTask(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetById&BoothBuilderId='+entity);
  }
  create(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=Create', entity);
  }
  edit(entity: GroupModel): Observable<any> {
    return this.http
      .put<any>(this.baseUrl+'?api=Update', entity);
  }
  delete(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=Delete', entity);
  }

}
