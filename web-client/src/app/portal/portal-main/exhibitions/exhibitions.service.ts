import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigModel} from "../../../configEntity";

@Injectable({
  providedIn: 'root'
})
export class ExhibitionsService {
  ExGradebaseUrl: any;
  ExbaseUrl: any;
  HallGradebaseUrl: any;
  HallbaseUrl: any;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    let config = new ConfigModel();
    this.ExGradebaseUrl = config.ServerAddress + 'ExhibitionGrade_api.php/';
    this.ExbaseUrl = config.ServerAddress + 'Exhibition_api.php/';
    this.HallGradebaseUrl = config.ServerAddress + 'HallGrade_api.php/';
    this.HallbaseUrl = config.ServerAddress + 'Hall_api.php/';
  }

  ExGradeget(): Observable<any> {
    return this.http.get<any>(this.ExGradebaseUrl + '?api=Get');
  }

  ExGradegetById(entity): Observable<any> {
    return this.http.get<any>(this.ExGradebaseUrl + '?api=GetById&Id=' + entity);
  }

  ExGradecreate(entity): Observable<any> {
    return this.http
      .post<any>(this.ExGradebaseUrl + '?api=Create', entity);
  }

  ExGradeedit(entity): Observable<any> {
    return this.http
      .put<any>(this.ExGradebaseUrl + '?api=Update', entity);
  }

  ExGradedelete(entity): Observable<any> {
    return this.http
      .post<any>(this.ExGradebaseUrl + '?api=Delete', entity);
  }

  Exget(): Observable<any> {
    return this.http.get<any>(this.ExbaseUrl + '?api=Get');
  }

  ExgetById(entity): Observable<any> {
    return this.http.get<any>(this.ExbaseUrl + '?api=GetById&Id=' + entity);
  }

  Excreate(entity): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl + '?api=Create', entity);
  }

  Exedit(entity): Observable<any> {
    return this.http
      .put<any>(this.ExbaseUrl + '?api=Update', entity);
  }

  Exdelete(entity): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl + '?api=Delete', entity);
  }

  ExgetGradeDropDown() {
    return this.http.get<any>(this.ExbaseUrl + '?api=GradeDropDown');
  }

  ExAssignHall(entity, id): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl + '?api=AssignHall', [entity, {'ExhibitionId': id}]);
  }

  ExgetExecuterDropDown() {
    return this.http.get<any>(this.ExbaseUrl + '?api=ExecuterDropDown');
  }

  ExgetHalladminDropDown() {
    return this.http.get<any>(this.ExbaseUrl + '?api=HalladminDropDown');
  }

  ExgetTechnicalExpertDropDown() {
    return this.http.get<any>(this.ExbaseUrl + '?api=TechnicalExpertDropDown');
  }

  ExgetArchitecturalExpertDropDown() {
    return this.http.get<any>(this.ExbaseUrl + '?api=ArchitecturalExpertDropDown');
  }

  ExAssignExecuter(entity): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl + '?api=AssignExecuter', entity);
  }

  ExAssignHalladmin(entity): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl + '?api=AssignHalladmin', entity);
  }

  ExAssignTechnicalExpert(entity): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl + '?api=AssignTechnicalExpert', entity);
  }

  ExAssignArchitecturalExpert(entity): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl + '?api=AssignArchitecturalExpert', entity);
  }

  ExDeleteAssignExecuter(entity): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl + '?api=DeleteAssignExecuter', entity);
  }

  ExDeleteAssignHalladmin(entity): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl + '?api=DeleteAssignHalladmin', entity);
  }

  ExDeleteAssignTechnicalExpert(entity): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl + '?api=DeleteAssignTechnicalExpert', entity);
  }

  ExDeleteAssignArchitecturalExpert(entity): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl + '?api=DeleteAssignArchitecturalExpert', entity);
  }

  ExgetExecuterByExhibitionId(entity): Observable<any> {
    return this.http.get<any>(this.ExbaseUrl + '?api=GetExecuterByExhibitionId&Id=' + entity);
  }

  ExgetHalladminByExhibitionId(entity): Observable<any> {
    return this.http.get<any>(this.ExbaseUrl + '?api=GetHalladminByExhibitionId&Id=' + entity);
  }

  ExgetTechnicalExpertByExhibitionId(entity): Observable<any> {
    return this.http.get<any>(this.ExbaseUrl + '?api=GetTechnicalExpertByExhibitionId&Id=' + entity);
  }

  ExgetArchitecturalExpertByExhibitionId(entity): Observable<any> {
    return this.http.get<any>(this.ExbaseUrl + '?api=GetArchitecturalExpertByExhibitionId&Id=' + entity);
  }

  getByExhibitionId(entity): Observable<any> {
    return this.http.get<any>(this.ExbaseUrl + '?api=GetByExhibitionId&Id=' + entity);
  }

  ExAssignHallAdmin(entity): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl + '?api=AssignHallAdmin', entity);
  }

  ExDeleteAssignHallAdmin(entity): Observable<any> {
    return this.http
      .post<any>(this.ExbaseUrl + '?api=DeleteAssignHallAdmin', entity);
  }

  HallGradeget(): Observable<any> {
    return this.http.get<any>(this.HallGradebaseUrl + '?api=Get');
  }

  HallGradegetById(entity): Observable<any> {
    return this.http.get<any>(this.HallGradebaseUrl + '?api=GetById&Id=' + entity);
  }

  HallGradecreate(entity): Observable<any> {
    return this.http
      .post<any>(this.HallGradebaseUrl + '?api=Create', entity);
  }

  HallGradeedit(entity): Observable<any> {
    return this.http
      .put<any>(this.HallGradebaseUrl + '?api=Update', entity);
  }

  HallGradedelete(entity): Observable<any> {
    return this.http
      .post<any>(this.HallGradebaseUrl + '?api=Delete', entity);
  }

  Hallget(): Observable<any> {
    return this.http.get<any>(this.HallbaseUrl + '?api=Get');
  }

  HallgetById(entity): Observable<any> {
    return this.http.get<any>(this.HallbaseUrl + '?api=GetById&Id=' + entity);
  }

  Hallcreate(entity): Observable<any> {
    return this.http
      .post<any>(this.HallbaseUrl + '?api=Create', entity);
  }

  Halledit(entity): Observable<any> {
    return this.http
      .put<any>(this.HallbaseUrl + '?api=Update', entity);
  }

  Halldelete(entity): Observable<any> {
    return this.http
      .post<any>(this.HallbaseUrl + '?api=Delete', entity);
  }

  HallgetGradeDropDown() {
    return this.http.get<any>(this.HallbaseUrl + '?api=GradeDropDown');
  }


}
