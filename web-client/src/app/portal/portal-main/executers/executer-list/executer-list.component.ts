import { Component, OnInit } from '@angular/core';
import {ExecutersService} from "../executers.service";
import {ExecuterBoothCreateComponent} from "../executer-booth-list/executer-booth-create/executer-booth-create.component";
import {GroupModel} from "../../groups/entity";
import {ExecuterBoothEditComponent} from "../executer-booth-list/executer-booth-edit/executer-booth-edit.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {BaseClass} from "../../../../utilities/base";
import {ExecuterCreateComponent} from "./executer-create/executer-create.component";
import {ExecuterEditComponent} from "./executer-edit/executer-edit.component";
import {RateComponent} from "../../../../utilities/component/rate/rate.component";

@Component({
  selector: 'app-executer-list',
  templateUrl: './executer-list.component.html',
  styleUrls: ['./executer-list.component.css']
})
export class ExecuterListComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      Name: {
        title: 'نام '
      },
      Mobile: {
        title: 'موبایل'
      },
      Username: {
        title: 'نام کاربری'
      },
      Rates: {
        title:'امتیاز',
        type: 'custom',
        renderComponent:RateComponent,
      },
      FlagBlock: {
        title: 'وضعیت',
        type:'html',
        valuePrepareFunction: (value) => {
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
          title: '<i class="fa fa-edit pr-3 ebcs-font-normal text-warning" title="ویرایش"></i>'
        },
        {
          name: 'deleteAction',
          title: '<i class="fa fa-trash pr-3 ebcs-font-normal text-danger" title="حذف"></i>'
        }
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  data;
  constructor(private executersService:ExecutersService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
               super(toastr);
              }
  ngOnInit(): void {
    this.executersService.getExecuter().subscribe(res=>{
      this.data = res.data.rows;
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
    let modalRef=this.modalService.open(ExecuterCreateComponent, {centered: true});
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  deleteHandler(inputModel) {
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.executersService.Executerdelete(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }

  editHandler(inputModel) {
    const modalRef = this.modalService.open(ExecuterEditComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }
}
