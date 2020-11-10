import {Component, OnInit} from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {HalladminsService} from "../../hall-admins/halladmins.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {HalladminCreateComponent} from "../../hall-admins/halladmin-list/halladmin-create/halladmin-create.component";
import {GroupModel} from "../../groups/entity";
import {HalladminEditComponent} from "../../hall-admins/halladmin-list/halladmin-edit/halladmin-edit.component";
import {SharedataService} from "../sharedata.service";
import {ExchangerateCreateComponent} from "./exchangerate-create/exchangerate-create.component";
import * as moment from "jalali-moment";

@Component({
  selector: 'app-exchangerate-list',
  templateUrl: './exchangerate-list.component.html',
  styleUrls: ['./exchangerate-list.component.css']
})
export class ExchangerateListComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      UnitPrice: {
        title: 'مبلغ (ریال)',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value === '0') return '-';
          let nfObject = new Intl.NumberFormat('en-US');
          let output = nfObject.format(value);
          return output;
        },
      },
      EffectiveDate: {
        title: 'تاریخ',
        valuePrepareFunction: (value) => {
          if (value === '0000-00-00 00:00:00') return '-';
          let t = moment(value, 'YYYY/MM/DD hh:mm:ss').locale('fa').format('hh:mm:ss YYYY/MM/DD');
          return t;
        },

      },
      FlagBlock: {
        title: 'وضعیت',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value === "0") return '<i class="fa fa-circle pr-3  text-success" title="فعال"></i>';
          return '<i class="fa fa-circle pr-3  text-warning" title="غیر فعال"></i>';
        },
      }
    },
    actions: {
      columnTitle: 'عملیات',
      custom: [
        {
          name: 'blockAction',
          title: '<i class="fa fa-pause pr-3 ebcs-font-normal text-danger" title="توقف"></i>'
        }
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  data;

  constructor(private sharedataService: SharedataService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.sharedataService.getExchangeRate().subscribe(res => {
      this.data = res.data.rows;
    });
  }

  methodHandler(e) {
    switch (e.action) {
      case 'createAction' : {
        this.createHandler();
        break;
      }
      case 'blockAction' : {
        this.blockHandler(e.data);
        break;
      }
    }
  }

  createHandler() {
    let modalRef = this.modalService.open(ExchangerateCreateComponent, {centered: true});
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  blockHandler(inputModel) {

  }
}
