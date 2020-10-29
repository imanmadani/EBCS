import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {ExecutersService} from "../executers.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {BoothbuilderPlanUploadComponent} from "../../booth-builders/boothbuilder-desk/boothbuilder-plan-upload/boothbuilder-plan-upload.component";
import {ExecuterhallPlanUploadComponent} from "./executerhall-plan-upload/executerhall-plan-upload.component";

@Component({
  selector: 'app-executerhall-list',
  templateUrl: './executerhall-list.component.html',
  styleUrls: ['./executerhall-list.component.css']
})
export class ExecuterhallListComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      ExName: {
        title: 'نام نمایشگاه'
      },
      HallTitle: {
        title: 'سالن'
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
          name: 'uploadAction',
          title: '<i class="fa fa-upload pr-3 ebcs-font-normal text-info" title="آپلود"></i>'
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
    private executersService: ExecutersService,
    private modalService: NgbModal,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.executersService.Hallget().subscribe(res => {
      this.data = res.data.rows;
    });
  }
  methodHandler(e) {
    switch (e.action) {
      case 'uploadAction' : {
        this.planUpdateHandler(e.data);
        break;
      }
    }
  }
  planUpdateHandler(inputModel) {
    let modalRef=this.modalService.open(ExecuterhallPlanUploadComponent, {centered: true,size:'xl'});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }
}
