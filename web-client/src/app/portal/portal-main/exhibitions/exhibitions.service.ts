import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GroupModel} from '../groups/entity';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionsService {
  baseUrl: any;
  ExbaseUrl: any;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = 'http://localhost:8383/api/' + 'ExhibitionGrade_api.php/';
    this.ExbaseUrl = 'http://localhost:8383/api/' + 'Exhibition_api.php/';
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
      .put<any>(this.baseUrl+'?api=Update', entity);
  }
  delete(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=Delete', entity);
  }

  Exget(): Observable<any> {
    return this.http.get<any>(this.ExbaseUrl + '?api=Get');
  }
  ExgetById(entity): Observable<any> {
    return this.http.get<any>(this.ExbaseUrl + '?api=GetById&Id='+entity);
  }
  Excreate(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl+'?api=Create', entity);
  }
  Exedit(entity): Observable<any> {
    return this.http
      .put<any>(this.ExbaseUrl+'?api=Update', entity);
  }
  Exdelete(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl+'?api=Delete', entity);
  }
  getGradeDropDown(){
    return this.http.get<any>(this.ExbaseUrl + '?api=GradeDropDown');
  }
}
