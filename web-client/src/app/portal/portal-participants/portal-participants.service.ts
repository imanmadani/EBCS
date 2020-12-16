import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GroupModel} from "../portal-main/groups/entity";

@Injectable({
  providedIn: 'root'
})
export class PortalParticipantsService {
  baseUrl: any;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = 'http://localhost/api/' + 'Participant_api.php/';
  }

  get(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=Get');
  }
  getUserByToken(): Observable<any> {

    return this.http.get<any>(this.baseUrl + '?api=GetByToken');
  }
  getById(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetById&Id='+entity);
  }
  getDataByParticipant(model): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetDataByParticipant&ParticipantId='+model);
  }
  getParticipantDetails(model): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetParticipantDetails&ParticipantId='+model);
  }
  getBoothBuilder(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetBoothBuilder');
  }
  getBoothBuilderByBoothId(model): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetBoothBuilderByBoothId&BoothId='+model);
  }
  selectBoothBuilder(entity) {
      return this.http.post<any>(this.baseUrl+'?api=SetBoothBoothBuilder', entity);
  }
  setBoothBuilderRate(entity) {
    return this.http.post<any>(this.baseUrl+'?api=SetBoothBuilderRate', entity);
  }
  getBoothBuilderRateByBoothId(model): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetBoothBuilderRateByBoothId&BoothId='+model);
  }
}
