import { Component, OnInit } from '@angular/core';
import {BoothbuildersService} from "../booth-builders/boothbuilders.service";
import {PaymentresultService} from "./paymentresult.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-paymentresult',
  templateUrl: './paymentresult.component.html',
  styleUrls: ['./paymentresult.component.css']
})
export class PaymentresultComponent implements OnInit {

  data={Id:1};
  resCode;
  amount;
  description;
  retrivalRefNo;
  systemTraceNo;
  orderId;
  details;
  constructor(private paymentresultService: PaymentresultService,
              private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.resCode = params['ResCode'];
      this.amount = params['Amount'];
      this.description = params['Description'];
      this.retrivalRefNo = params['RetrivalRefNo'];
      this.systemTraceNo = params['SystemTraceNo'];
      this.orderId = params['OrderId'];
      debugger
      if(this.orderId){
      this.paymentresultService.getBillByOrderId(this.orderId).subscribe(res=>{
      this.details=res.data.row;
      });
      }
    });
  }

}
