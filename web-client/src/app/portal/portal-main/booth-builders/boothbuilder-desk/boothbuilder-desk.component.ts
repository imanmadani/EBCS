import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {RateComponent} from "../../../../utilities/component/rate/rate.component";
import {BoothbuildersService} from "../boothbuilders.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {ExhibitionHallCreateComponent} from "../../exhibitions/exhibition-hall-list/exhibition-hall-create/exhibition-hall-create.component";
import {GroupModel} from "../../groups/entity";
import {ExhibitionHallEditComponent} from "../../exhibitions/exhibition-hall-list/exhibition-hall-edit/exhibition-hall-edit.component";
import {BoothbuilderPlanUploadComponent} from "./boothbuilder-plan-upload/boothbuilder-plan-upload.component";

@Component({
  selector: 'app-boothbuilder-desk',
  templateUrl: './boothbuilder-desk.component.html',
  styleUrls: ['./boothbuilder-desk.component.css']
})
export class BoothbuilderDeskComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      ExhibitionName: {
        title: 'نمایشگاه'
      },
      HallName: {
        title: 'سالن',
        width:"150px",

      },
      BoothName: {
        title:'شماره غرفه',
        width:"150px",

      },
      ParticipantName: {
        title:'مشارکت کننده',
      },
      PayStatus: {
        title: 'وضعیت پرداخت',
        type:'html',

        valuePrepareFunction: (value) => {
          if (value==="1") return '<i class="fa fa-circle pr-3  text-success" title="فعال"></i>';
          return '<i class="fa fa-circle pr-3  text-warning" title="غیر فعال"></i>';
        },
      },
      FlagBlock: {
        title: 'وضعیت',
        type:'html',
        width:"100px",
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
        },
        {
          name: 'uploadAction',
          title: '<i class="fa fa-upload pr-3 ebcs-font-normal text-info" title="آپلود"></i>'
        },
        {
          name: 'paymentAction',
          title: '<i class="fa fa-money-bill-wave pr-3 ebcs-font-normal text-primary" title="پرداخت"></i>'
        },
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  data;

  constructor(
    private boothBuilderService: BoothbuildersService,
    private modalService: NgbModal,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.boothBuilderService.getBoothBuilderTask(1).subscribe(res => {
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
      case 'uploadAction' : {
        this.planUpdateHandler(e.data);
        break;
      }
      case 'paymentAction' : {
        this.paymentHandler(e.data);
        break;
      }
    }
  }

  createHandler() {
    let modalRef=this.modalService.open(ExhibitionHallCreateComponent, {centered: true});
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  deleteHandler(inputModel) {
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.boothBuilderService.delete(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }

  editHandler(inputModel) {
    const modalRef = this.modalService.open(ExhibitionHallEditComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  planUpdateHandler(inputModel) {
    let modalRef=this.modalService.open(BoothbuilderPlanUploadComponent, {centered: true,size:'xl'});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  paymentHandler(inputModel) {

  }
}

