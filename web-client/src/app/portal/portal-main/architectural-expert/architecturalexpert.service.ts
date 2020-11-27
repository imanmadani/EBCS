import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArchitecturalexpertService {
  private ArchitecturalexpertbaseUrl:any;
  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    this.ArchitecturalexpertbaseUrl = 'http://localhost/api/' + 'ArchitecturalExpert_api.php/';

  }
  get(): Observable<any> {
    return this.http.get<any>(this.ArchitecturalexpertbaseUrl + '?api=Get');
  }
  getArchitecturalExpertTask(): Observable<any> {
    return this.http.get<any>(this.ArchitecturalexpertbaseUrl + '?api=GetArchitecturalExpertTask');
  }
  getById(entity): Observable<any> {
    return this.http.get<any>(this.ArchitecturalexpertbaseUrl + '?api=GetById&Id='+entity);
  }
  create(entity): Observable<any> {
    return this.http
      .post<any>(this.ArchitecturalexpertbaseUrl+'?api=Create', entity);
  }
  edit(entity): Observable<any> {
    return this.http
      .put<any>(this.ArchitecturalexpertbaseUrl+'?api=Update', entity);
  }
  delete(entity): Observable<any> {
    return this.http
      .post<any>(this.ArchitecturalexpertbaseUrl+'?api=Delete', entity);
  }
  infringementCreate(entity): Observable<any> {
    return this.http.post<any>(this.ArchitecturalexpertbaseUrl+'?api=InfrigementCreate', entity);
  }
  getInfringementDropDown(){
    return this.http.get<any>(this.ArchitecturalexpertbaseUrl + '?api=InfrigementDropDown');
  }
  getArchitecturalexpertInfringements(){
    return this.http.get<any>(this.ArchitecturalexpertbaseUrl + '?api=GetArchitecturalInfringements');
  }
  boothApprove(entity): Observable<any> {
    return this.http
      .post<any>(this.ArchitecturalexpertbaseUrl+'?api=BoothApprove', entity);
  }
  boothDisApprove(entity): Observable<any> {
    return this.http
      .post<any>(this.ArchitecturalexpertbaseUrl+'?api=BoothDisApprove', entity);
  }
}
