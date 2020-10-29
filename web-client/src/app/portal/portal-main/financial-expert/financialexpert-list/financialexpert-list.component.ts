import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {RateComponent} from "../../../../utilities/component/rate/rate.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {HalladminCreateComponent} from "../../hall-admins/halladmin-list/halladmin-create/halladmin-create.component";
import {GroupModel} from "../../groups/entity";
import {HalladminEditComponent} from "../../hall-admins/halladmin-list/halladmin-edit/halladmin-edit.component";
import {FinancialexpertService} from "../financialexpert.service";
import {FinancialexpertEditComponent} from "./financialexpert-edit/financialexpert-edit.component";
import {FinancialexpertCreateComponent} from "./financialexpert-create/financialexpert-create.component";

@Component({
  selector: 'app-financialexpert-list',
  templateUrl: './financialexpert-list.component.html',
  styleUrls: ['./financialexpert-list.component.css']
})
export class FinancialexpertListComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      Name: {
        title: 'نام '
      },
      Username: {
        title: 'نام کاربری'
      },
      FlagBlock: {
        title: 'وضعیت',
        type:'html',
        valuePrepareFunction: (value) => {
          debugger
          if (value==="0") return '<i class="fa fa-circle pr-3  text-success" title="فعال"></i>';
          return '<i class="fa fa-circle pr-3  text-warning" title="غیر فعال"></i>';
        },
      }
    },
    actions: {
      columnTitle: 'عملیات',
      custom: [
        {
          name: 'editAction',
          title: '<i class="fa fa-edit pr-3 ebcs-font-normal text-warning" title="Edit"></i>'
        },
        {
          name: 'deleteAction',
          title: '<i class="fa fa-trash pr-3 ebcs-font-normal text-danger" title="Edit"></i>'
        }
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  data;
  constructor(private financialexpertService:FinancialexpertService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
    this.financialexpertService.getFinancialExpert().subscribe(res=>{
      this.data = res.data.rows;
      console.log(this.data);
    });
  }

  methodHandler(e) {
    switch (e.action) {
      case 'editAction' : {
        this.editHandler(e.data);
        break;
      }
      case 'deleteAction' : {
        this.deleteHandler(e.data);
        break;
      }
    }
  }
  createHandler() {
    let modalRef=this.modalService.open(FinancialexpertCreateComponent, {centered: true});
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  deleteHandler(inputModel) {
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.financialexpertService.FinancialExpertdelete(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }

  editHandler(inputModel) {
    const modalRef = this.modalService.open(FinancialexpertEditComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }
}
