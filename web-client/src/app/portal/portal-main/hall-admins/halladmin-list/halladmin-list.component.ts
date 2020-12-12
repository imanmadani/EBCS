import { Component, OnInit } from '@angular/core';
import {HalladminsService} from "../halladmins.service";
import {GroupModel} from "../../groups/entity";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {BaseClass} from "../../../../utilities/base";
import {HalladminCreateComponent} from "./halladmin-create/halladmin-create.component";
import {HalladminEditComponent} from "./halladmin-edit/halladmin-edit.component";
import {RateComponent} from "../../../../utilities/component/rate/rate.component";

@Component({
  selector: 'app-halladmin-list',
  templateUrl: './halladmin-list.component.html',
  styleUrls: ['./halladmin-list.component.css']
})
export class HalladminListComponent extends BaseClass implements OnInit {
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
  constructor(private halladminsService:HalladminsService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
               super(toastr);
              }
  ngOnInit(): void {
    this.halladminsService.getHallAdmin().subscribe(res=>{
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
    let modalRef=this.modalService.open(HalladminCreateComponent, {centered: true});
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  deleteHandler(inputModel) {
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.halladminsService.HallAdmindelete(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }

  editHandler(inputModel) {
    const modalRef = this.modalService.open(HalladminEditComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }
}
