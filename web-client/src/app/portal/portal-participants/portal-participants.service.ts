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
  getById(entity): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetById&Id='+entity);
  }
  getDataByParticipant(model): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetDataByParticipant&ParticipantId='+model);
  }
  getParticipantDetails(model): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetParticipantDetails&ParticipantId='+model);
  }
  getBoothBuilder(model): Observable<any> {
    return this.http.get<any>(this.baseUrl + '?api=GetBoothBuilder&BoothId='+model);
  }

}
