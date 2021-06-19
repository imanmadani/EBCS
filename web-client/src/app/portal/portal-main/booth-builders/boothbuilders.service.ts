import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GroupModel} from "../groups/entity";
import {ConfigModel} from "../../../configEntity";

@Injectable({
  providedIn: 'root'
})
export class BoothbuildersService {
  baseUrl: any;
  BoothbaseUrl: any;
  PaymentbaseUrl: any;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    let config = new ConfigModel();
    this.baseUrl = config.ServerAddress + 'BoothBuilder_api.php/';
    this.BoothbaseUrl = config.ServerAddress + 'Booth_api.php/';
    this.PaymentbaseUrl = config.ServerAddress + 'Payment_api.php/';

  }

  get(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=Get');
  }

  getGrade(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetGrade');
  }

  getById(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetById&Id=' + entity);
  }

  getFileHSE(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetFileHSE&BoothBuilderId=' + entity);
  }

  getBoothBuilderImageTypes(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetBoothBuilderImageTypes');
  }

  getFileLicense(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetFileLicense&BoothBuilderId=' + entity);
  }

  getFileHSEByUser(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetFileHSEByUser');
  }

  getFileLicenseByUser(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetFileLicenseByUser');
  }

  getByToken(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetByToken');
  }

  getGradeById(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetGradeById&Id=' + entity);
  }

  getBoothBuilderTask(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=getBoothBuilderTask');
  }

  create(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + '?api=Create', entity);
  }

  createGrade(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + '?api=CreateGrade', entity);
  }

  edit(entity: GroupModel): Observable<any> {
    return this.http
      .put<any>(this.baseUrl + '?api=Update', entity);
  }
  editBoothGrade(entity: GroupModel): Observable<any> {
    return this.http
      .put<any>(this.baseUrl + '?api=Update', entity);
  }

  editGrade(entity: GroupModel): Observable<any> {
    return this.http
      .put<any>(this.baseUrl + '?api=UpdateGrade', entity);
  }

  editLicenseExpire(entity: GroupModel): Observable<any> {
    return this.http
      .put<any>(this.baseUrl + '?api=UpdateLicenseExpire', entity);
  }

  delete(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + '?api=Delete', entity);
  }

  endAction(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + '?api=EndAction', entity);
  }

  deleteGrade(entity: GroupModel): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + '?api=DeleteGrade', entity);
  }

  getBoothBuilderGradeDropDown() {
    return this.http.get<any>(this.baseUrl + '?api=BoothBuilderGradeDropDown');
  }

  uploadPlan(entity): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + '?api=UploadPlan', entity);
  }

  uploadHSE(entity): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + '?api=UploadHSE', entity);
  }

  uploadLicense(entity): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + '?api=uploadLicense', entity);
  }

  deletePlan(entity): Observable<any> {
    return this.http
      .post<any>(this.baseUrl + '?api=DeletePlan', entity);
  }

  GetUploadFileByBoothBoothbuilderId(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetUploadFileByBoothBoothbuilderId&Id=' + entity);
  }

  getPlanCommentsByboothboothbuilderplan(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetPlanCommentsByboothboothbuilderplanId&BoothBoothbuilderPlanId=' + entity);
  }

  getIdentity(entity): Observable<any> {
    return this.http.get<any>(this.PaymentbaseUrl + '?api=Verhoeff&Value=' + entity.Mobile + "&Amount=" + entity.Amount + "&BillId=" + entity.BillId);
  }

  acceptPolicyForm(entity): Observable<any> {
    return this.http
      .put<any>(this.baseUrl + '?api=AcceptPolicyForm', entity);
  }

  BoothgetConstTypeDropDown() {
    return this.http.get<any>(this.BoothbaseUrl + '?api=ConstTypeDropDown');
  }

  getBoothById(entity) {
    return this.http.get<any>(this.BoothbaseUrl + '?api=GetById&Id=' + entity);
  }

  editConstType(entity): Observable<any> {
    return this.http
      .put<any>(this.BoothbaseUrl + '?api=updateConstType', entity);
  }

}
