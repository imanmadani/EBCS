import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {HalladminsService} from "../../hall-admins/halladmins.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {HalladminCreateComponent} from "../../hall-admins/halladmin-list/halladmin-create/halladmin-create.component";
import {GroupModel} from "../../groups/entity";
import {HalladminEditComponent} from "../../hall-admins/halladmin-list/halladmin-edit/halladmin-edit.component";
import {ElectricalExpertService} from "../electrical-expert.service";
import {ElectricalexpertCreateComponent} from "./electricalexpert-create/electricalexpert-create.component";
import {ElectricalexpertEditComponent} from "./electricalexpert-edit/electricalexpert-edit.component";

@Component({
  selector: 'app-electricalexpert-list',
  templateUrl: './electricalexpert-list.component.html',
  styleUrls: ['./electricalexpert-list.component.css']
})
export class ElectricalexpertListComponent extends BaseClass implements OnInit {
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
      width: '300px',
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
  constructor(private electricalExpertService:ElectricalExpertService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
    this.electricalExpertService.getElectricalExpert().subscribe(res=>{
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
    let modalRef=this.modalService.open(ElectricalexpertCreateComponent, {centered: true});
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  deleteHandler(inputModel) {
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.electricalExpertService.ElectricalExpertdelete(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }

  editHandler(inputModel) {
    const modalRef = this.modalService.open(ElectricalexpertEditComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }
}
