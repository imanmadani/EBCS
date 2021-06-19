import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigModel} from "../../../configEntity";

@Injectable({
  providedIn: 'root'
})
export class ArchitecturalexpertService {
  private ArchitecturalexpertbaseUrl: any;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    let config = new ConfigModel();
    this.ArchitecturalexpertbaseUrl = config.ServerAddress + 'ArchitecturalExpert_api.php/';

  }

  get(): Observable<any> {
    return this.http.get<any>(this.ArchitecturalexpertbaseUrl + '?api=Get');
  }

  getArchitecturalExpertTask(): Observable<any> {
    return this.http.get<any>(this.ArchitecturalexpertbaseUrl + '?api=GetArchitecturalExpertTask');
  }
  getArchitecturalExpertBooth(): Observable<any> {
    return this.http.get<any>(this.ArchitecturalexpertbaseUrl + '?api=GetArchitecturalExpertBooth');
  }

  getById(entity): Observable<any> {
    return this.http.get<any>(this.ArchitecturalexpertbaseUrl + '?api=GetById&Id=' + entity);
  }

  create(entity): Observable<any> {
    return this.http
      .post<any>(this.ArchitecturalexpertbaseUrl + '?api=Create', entity);
  }

  edit(entity): Observable<any> {
    return this.http
      .put<any>(this.ArchitecturalexpertbaseUrl + '?api=Update', entity);
  }

  delete(entity): Observable<any> {
    return this.http
      .post<any>(this.ArchitecturalexpertbaseUrl + '?api=Delete', entity);
  }

  infringementCreate(entity): Observable<any> {
    return this.http.post<any>(this.ArchitecturalexpertbaseUrl + '?api=InfrigementCreate', entity);
  }

  getInfringementDropDown() {
    return this.http.get<any>(this.ArchitecturalexpertbaseUrl + '?api=InfrigementDropDown');
  }

  getArchitecturalexpertInfringements() {
    return this.http.get<any>(this.ArchitecturalexpertbaseUrl + '?api=GetArchitecturalInfringements');
  }

  boothApprove(entity): Observable<any> {
    return this.http
      .post<any>(this.ArchitecturalexpertbaseUrl + '?api=BoothApprove', entity);
  }

  boothDisApprove(entity): Observable<any> {
    return this.http
      .post<any>(this.ArchitecturalexpertbaseUrl + '?api=BoothDisApprove', entity);
  }
}
