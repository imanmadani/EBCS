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
    return this.http.get<any>(this.BoothbaseUrl + '?api=Get');
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
}
