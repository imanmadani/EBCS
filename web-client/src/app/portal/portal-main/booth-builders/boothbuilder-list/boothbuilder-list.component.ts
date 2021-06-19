import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {ExhibitionsService} from "../../exhibitions/exhibitions.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {ExhibitionHallCreateComponent} from "../../exhibitions/exhibition-hall-list/exhibition-hall-create/exhibition-hall-create.component";
import {GroupModel} from "../../groups/entity";
import {ExhibitionHallEditComponent} from "../../exhibitions/exhibition-hall-list/exhibition-hall-edit/exhibition-hall-edit.component";
import {BoothbuildersService} from "../boothbuilders.service";
import {RateComponent} from "../../../../utilities/component/rate/rate.component";
import {BoothbuilderCreateComponent} from "./boothbuilder-create/boothbuilder-create.component";
import {BoothbuilderUpdateexpirelicenseComponent} from "./boothbuilder-updateexpirelicense/boothbuilder-updateexpirelicense.component";
import * as moment from "jalali-moment";
import {BoothbuilderFilemanagementComponent} from "./boothbuilder-filemanagement/boothbuilder-filemanagement.component";
import {BoothbuilderEditComponent} from "./boothbuilder-edit/boothbuilder-edit.component";

@Component({
  selector: 'app-boothbuilder-list',
  templateUrl: './boothbuilder-list.component.html',
  styleUrls: ['./boothbuilder-list.component.css']
})
export class BoothbuilderListComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      Name: {
        title: 'نام '
      },
      Mobile: {
        width: '200px',
        title: 'موبایل'
      },
      Username: {
        title: 'نام کاربری'
      },
      Grade: {
        width: '100px',
        title: 'گرید'
      },
      LimitArea: {
        width: '150px',
        title: 'حداکثر متراژ'
      },
      LicenseExpire: {
        title: 'اتمام اعتبار',
        valuePrepareFunction: (value) => {
          if (!value||value==='0000-00-00 00:00:00') return '-';
          let t=moment(value, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
          return t;
        },

      },

      Rate: {
        title:'امتیاز',
        type: 'custom',
        renderComponent:RateComponent,
      },
      FlagBlock: {
        width: '100px',
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
          name: 'editExpireAction',
          title: '<i class="fa fa-award pr-3 ebcs-font-normal text-warning" title="تمدید اعتبار"></i>'
        },
        {
          name: 'FileManagementAction',
          title: '<i class="fa fa-file-image pr-3 ebcs-font-normal text-info" title="مدارک"></i>'
        },
        {
          name: 'editAction',
          title: '<i class="fa fa-edit pr-3 ebcs-font-normal text-danger" title="ویرایش"></i>'
        }
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
    this.boothBuilderService.get().subscribe(res => {
      this.data = res.data.rows;
    });
  }

  methodHandler(e) {
    switch (e.action) {
      case 'editAction' : {
        this.editHandler(e.data);
        break;
      }
      case 'editExpireAction' : {
        this.editExpireHandler(e.data);
        break;
      }
      case 'FileManagementAction' : {
        this.filemanagementHandler(e.data);
        break;
      }
      case 'editAction' : {
        this.editHandler(e.data);
        break;
      }
    }
  }

  createHandler() {
    let modalRef=this.modalService.open(BoothbuilderCreateComponent, {centered: true});
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
    const modalRef = this.modalService.open(BoothbuilderEditComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  editExpireHandler(inputModel) {
    const modalRef = this.modalService.open(BoothbuilderUpdateexpirelicenseComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  private filemanagementHandler(inputModel) {
    const modalRef = this.modalService.open(BoothbuilderFilemanagementComponent, {centered: true,size:'xl'});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }
}
