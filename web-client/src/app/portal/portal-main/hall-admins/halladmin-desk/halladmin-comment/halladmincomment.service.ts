import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigModel} from "../../../../../configEntity";

@Injectable({
  providedIn: 'root'
})
export class HalladmincommentService {
  private HalladminCommentbaseUrl: any;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    let config = new ConfigModel();
    this.HalladminCommentbaseUrl = config.ServerAddress + 'BoothComment_api.php/';

  }

  getCommentsByBoothId(model): Observable<any> {
    return this.http.get<any>(this.HalladminCommentbaseUrl + '?api=GetCommentsByBooth&BoothId=' + model.BoothId);
  }

  setCommentsByBoothId(entity): Observable<any> {
    return this.http.post<any>(this.HalladminCommentbaseUrl + '?api=InsertCommentByBooth', entity);
  }
}
