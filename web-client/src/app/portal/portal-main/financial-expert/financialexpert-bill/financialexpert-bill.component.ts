import { Component, OnInit } from '@angular/core';
import {FinancialexpertService} from "../financialexpert.service";

@Component({
  selector: 'app-financialexpert-bill',
  templateUrl: './financialexpert-bill.component.html',
  styleUrls: ['./financialexpert-bill.component.css']
})
export class FinancialexpertBillComponent implements OnInit {
  settings = {
    columns: {
      SystemTrace: {
        title: 'شماره ردیابی'
      },
      RetrivalRef: {
        title: 'کدپیگیری'
      },
      BillIdentity: {
        title: 'شناسه نسیم'
      },
      ExName: {
        title: 'نام نمایشگاه'
      },
      HallTitle: {
        title: 'نام سالن'
      },
      Name: {
        title: 'شماره غرفه'
      },
      ParticipantUsername: {
        title: 'مشارکت کننده'
      },
      BuilderName: {
        title: 'غرفه ساز'
      },
      BillType: {
        title: 'شرح پرداخت'
      },
      Quantity: {
        title: 'مقدار'
      },
      QuantityType: {
        title: 'واحد'
      },
      Amount: {
        title: 'مبلغ'
      },
      PayStatus: {
        title: 'وضعیت پرداخت',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value === "1") return '<i class="fa fa-circle pr-3  text-success" title="پرداخت شده"></i>';
          return '<i class="fa fa-circle pr-3  text-warning" title="پرداخت نشده"></i>';
        },
      },
      FinancialApprove: {
        title: 'تایید مالی',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value === "1") return '<i class="fa fa-circle pr-3  text-success" title="تایید شده"></i>';
          return '<i class="fa fa-circle pr-3  text-warning" title="تایید نشده"></i>';
        },
      }
    },
    actions: {
      columnTitle: 'عملیات',
      width: '300px',
      custom: [],
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    }
  };
  data;
  constructor(private financialexpertService: FinancialexpertService,) { }

  ngOnInit(): void {
    this.financialexpertService.getFinancialExpertBills().subscribe(res=>{
      this.data = res.data.rows;
    });
  }

}
