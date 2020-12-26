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
  getGrade(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetGrade');
  }
  getById(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetById&Id='+entity);
  }
  getByToken(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetByToken');
  }
  getGradeById(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetGradeById&Id='+entity);
  }
  getBoothBuilderTask(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=getBoothBuilderTask');
  }
  create(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=Create', entity);
  }
  createGrade(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=CreateGrade', entity);
  }
  edit(entity: GroupModel): Observable<any> {
    return this.http
      .put<any>(this.baseUrl+'?api=Update', entity);
  }
  editGrade(entity: GroupModel): Observable<any> {
    return this.http
      .put<any>(this.baseUrl+'?api=UpdateGrade', entity);
  }
  delete(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=Delete', entity);
  }
  endAction(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=EndAction', entity);
  }
  deleteGrade(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=DeleteGrade', entity);
  }
  getBoothBuilderGradeDropDown(){
    return this.http.get<any>(this.baseUrl + '?api=BoothBuilderGradeDropDown');
  }
  uploadPlan(entity): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=UploadPlan', entity);
  }
  deletePlan(entity): Observable<any> {
    return this.http
      .post<any>(this.baseUrl+'?api=DeletePlan', entity);
  }
  GetUploadFileByBoothBoothbuilderId(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetUploadFileByBoothBoothbuilderId&Id='+entity);
  }
  getIdentity(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=Verhoeff&Value='+entity.Mobile+"&Amount="+entity.Amount);
  }
  acceptPolicyForm(entity): Observable<any> {
    return this.http
      .put<any>(this.baseUrl+'?api=AcceptPolicyForm', entity);
  }

}
