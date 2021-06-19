import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConfigModel} from "../../../configEntity";

@Injectable({
  providedIn: 'root'
})
export class PaymentresultService {
  PaymentbaseUrl: any;

  constructor(private http: HttpClient,
              @Inject('BASE_URL') baseUrl: string) {
    let config = new ConfigModel();
    this.PaymentbaseUrl = config.ServerAddress + 'Payment_api.php/';
  }

  verifyPayment(entity): Observable<any> {
    return this.http.get<any>(this.PaymentbaseUrl + '?api=VerifyPayment&Id=' + entity.Id);
  }
  getBillStatusByBoothId(entity): Observable<any> {
    return this.http.get<any>(this.PaymentbaseUrl + '?api=GetBillStatusByBooth&BoothId=' + entity.BoothId);
  }
  getBillByOrderId(entity): Observable<any> {
    return this.http.get<any>(this.PaymentbaseUrl + '?api=GetBillById&OrderId=' + entity);
  }
}
