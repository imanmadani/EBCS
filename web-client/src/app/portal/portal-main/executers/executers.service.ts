import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExecutersService {
  private BoothbaseUrl:any;
  private ExecuterbaseUrl:any;
  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.BoothbaseUrl = 'http://localhost/api/' + 'Booth_api.php/';
    this.ExecuterbaseUrl = 'http://localhost/api/' + 'Executer_api.php/';

  }
  Boothget(): Observable<any> {
    return this.http.get<any>(this.ExecuterbaseUrl + '?api=GetBoothByExecuter');
  }
  Hallget(): Observable<any> {
    return this.http.get<any>(this.ExecuterbaseUrl + '?api=GetHallByExecuter');
  }
  getHalladminDropDown($exhibitionId): Observable<any> {
    return this.http.get<any>(this.ExecuterbaseUrl + '?api=GetHallAdminsByExhibition&ExhibitionId='+$exhibitionId);
  }
  getHalladminByExhibitionHallId(model): Observable<any> {
    return this.http.get<any>(this.ExecuterbaseUrl + '?api=GetHallAdminsByExhibitionHall&ExhibitionHallId='+model);
  }
  deleteAssignHalladmin(entity): Observable<any> {
    return this.http
      .post<any>(this.ExecuterbaseUrl+'?api=DeleteAssignHalladmin', entity);
  }
  BoothgetById(entity): Observable<any> {
    return this.http.get<any>(this.BoothbaseUrl + '?api=GetById&Id='+entity);
  }
  Boothcreate(entity): Observable<any> {
    return this.http
      .post<any>(this.BoothbaseUrl+'?api=Create', entity);
  }
  Boothedit(entity): Observable<any> {
    return this.http
      .put<any>(this.BoothbaseUrl+'?api=Update', entity);
  }
  Boothdelete(entity): Observable<any> {
    return this.http
      .post<any>(this.BoothbaseUrl+'?api=Delete', entity);
  }

  BoothgetExhibitionDropDown(){
    return this.http.get<any>(this.BoothbaseUrl + '?api=ExhibitionDropDown');
  }
  BoothgetParticipantDropDown(){
    return this.http.get<any>(this.BoothbaseUrl + '?api=ParticipantDropDown');
  }
  BoothgetConstTypeDropDown(){
    return this.http.get<any>(this.BoothbaseUrl + '?api=ConstTypeDropDown');
  }
  BoothgetHallDropDown(exhibitionId){
    return this.http.get<any>(this.BoothbaseUrl + '?api=HallDropDown&ExhibitionId='+exhibitionId);
  }
  getExecuter(): Observable<any> {
    return this.http.get<any>(this.ExecuterbaseUrl + '?api=Get');
  }
  getExecuterById(entity): Observable<any> {
    return this.http.get<any>(this.ExecuterbaseUrl + '?api=GetById&Id='+entity);
  }
  Executercreate(entity): Observable<any> {
    return this.http
      .post<any>(this.ExecuterbaseUrl+'?api=Create', entity);
  }
  Executeredit(entity): Observable<any> {
    return this.http
      .put<any>(this.ExecuterbaseUrl+'?api=Update', entity);
  }
  Executerdelete(entity): Observable<any> {
    return this.http
      .post<any>(this.ExecuterbaseUrl+'?api=Delete', entity);
  }
  uploadPlan(entity): Observable<any> {
    return this.http
      .post<any>(this.ExecuterbaseUrl+'?api=UploadPlan', entity);
  }
  deletePlan(entity): Observable<any> {
    return this.http
      .post<any>(this.ExecuterbaseUrl+'?api=DeletePlan', entity);
  }
  GetUploadFileByExhibitionHallId(entity): Observable<any> {
    return this.http.get<any>(this.ExecuterbaseUrl + '?api=GetUploadFileByExhibitionHallId&Id='+entity);
  }
  assignHalladmin(entity): Observable<any> {
    return this.http
      .post<any>(this.ExecuterbaseUrl+'?api=AssignHalladmin', entity);
  }
  getParticipantByExecuter(): Observable<any> {
    return this.http.get<any>(this.ExecuterbaseUrl + '?api=GetParticipantByExecuter');
  }
  participantcreate(entity): Observable<any> {
    return this.http
      .post<any>(this.ExecuterbaseUrl+'?api=CreateParticipant', entity);
  }
}
