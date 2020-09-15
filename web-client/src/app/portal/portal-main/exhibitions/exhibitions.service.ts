import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GroupModel} from '../groups/entity';

@Injectable({
  providedIn: 'root'
})
export class ExhibitionsService {
  ExGradebaseUrl: any;
  ExbaseUrl: any;
  HallGradebaseUrl:any;
  HallbaseUrl:any;
  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.ExGradebaseUrl = 'http://localhost:8383/api/' + 'ExhibitionGrade_api.php/';
    this.ExbaseUrl = 'http://localhost:8383/api/' + 'Exhibition_api.php/';
    this.HallGradebaseUrl = 'http://localhost:8383/api/' + 'HallGrade_api.php/';
    this.HallbaseUrl = 'http://localhost:8383/api/' + 'Hall_api.php/';
  }

  ExGradeget(): Observable<any> {
    return this.http.get<any>(this.ExGradebaseUrl + '?api=Get');
  }
  ExGradegetById(entity): Observable<any> {
    return this.http.get<any>(this.ExGradebaseUrl + '?api=GetById&Id='+entity);
  }
  ExGradecreate(entity): Observable<any> {
    return this.http
      .post<any>(this.ExGradebaseUrl+'?api=Create', entity);
  }
  ExGradeedit(entity): Observable<any> {
    return this.http
      .put<any>(this.ExGradebaseUrl+'?api=Update', entity);
  }
  ExGradedelete(entity): Observable<any> {
    return this.http
      .post<any>(this.ExGradebaseUrl+'?api=Delete', entity);
  }

  Exget(): Observable<any> {
    return this.http.get<any>(this.ExbaseUrl + '?api=Get');
  }
  ExgetById(entity): Observable<any> {
    return this.http.get<any>(this.ExbaseUrl + '?api=GetById&Id='+entity);
  }
  Excreate(entity): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl+'?api=Create', entity);
  }
  Exedit(entity): Observable<any> {
    return this.http
      .put<any>(this.ExbaseUrl+'?api=Update', entity);
  }
  Exdelete(entity): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl+'?api=Delete', entity);
  }
  ExgetGradeDropDown(){
    return this.http.get<any>(this.ExbaseUrl + '?api=GradeDropDown');
  }
  ExAssignHall(entity,id): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl+'?api=AssignHall', [entity,{'ExhibitionId':id}]);
  }
  getByExhibitionId(entity): Observable<any> {
    return this.http.get<any>(this.ExbaseUrl + '?api=GetByExhibitionId&Id='+entity);
  }

  HallGradeget(): Observable<any> {
    return this.http.get<any>(this.HallGradebaseUrl + '?api=Get');
  }
  HallGradegetById(entity): Observable<any> {
    return this.http.get<any>(this.HallGradebaseUrl + '?api=GetById&Id='+entity);
  }
  HallGradecreate(entity): Observable<any> {
    return this.http
      .post<any>(this.HallGradebaseUrl+'?api=Create', entity);
  }
  HallGradeedit(entity): Observable<any> {
    return this.http
      .put<any>(this.HallGradebaseUrl+'?api=Update', entity);
  }
  HallGradedelete(entity): Observable<any> {
    return this.http
      .post<any>(this.HallGradebaseUrl+'?api=Delete', entity);
  }

  Hallget(): Observable<any> {
    return this.http.get<any>(this.HallbaseUrl + '?api=Get');
  }
  HallgetById(entity): Observable<any> {
    return this.http.get<any>(this.HallbaseUrl + '?api=GetById&Id='+entity);
  }
  Hallcreate(entity): Observable<any> {
    return this.http
      .post<any>(this.HallbaseUrl+'?api=Create', entity);
  }
  Halledit(entity): Observable<any> {
    return this.http
      .put<any>(this.HallbaseUrl+'?api=Update', entity);
  }
  Halldelete(entity): Observable<any> {
    return this.http
      .post<any>(this.HallbaseUrl+'?api=Delete', entity);
  }
  HallgetGradeDropDown(){
    return this.http.get<any>(this.HallbaseUrl + '?api=GradeDropDown');
  }

}
