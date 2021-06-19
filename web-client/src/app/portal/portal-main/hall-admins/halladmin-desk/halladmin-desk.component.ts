import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {BoothbuildersService} from "../../booth-builders/boothbuilders.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {ExhibitionHallCreateComponent} from "../../exhibitions/exhibition-hall-list/exhibition-hall-create/exhibition-hall-create.component";
import {GroupModel} from "../../groups/entity";
import {ExhibitionHallEditComponent} from "../../exhibitions/exhibition-hall-list/exhibition-hall-edit/exhibition-hall-edit.component";
import {HalladminsService} from "../halladmins.service";
import {HalladminCommentComponent} from "./halladmin-comment/halladmin-comment.component";
import {TechnicalexpertFilemanagementComponent} from "../../technical-expert/technicalexpert-desk/technicalexpert-filemanagement/technicalexpert-filemanagement.component";

@Component({
  selector: 'app-halladmin-desk',
  templateUrl: './halladmin-desk.component.html',
  styleUrls: ['./halladmin-desk.component.css']
})
export class HalladminDeskComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      ExhibitionName: {
        title: 'نمایشگاه'
      },
      HallName: {
        title: 'سالن'
      },
      BoothName: {
        title: 'شماره غرفه'
      },
      BoothParty: {
        title: 'مشارکت کننده'
      },
      BoothPartyName: {
        title: 'نماینده'
      },
      BoothPartyTell: {
        title: 'تلفن'
      },
      FlagBlock: {
        title: 'وضعیت',
        type:'html',
        valuePrepareFunction: (value) => {
          if (value==="0") return '<i class="fa fa-circle pr-3  text-success" title="فعال"></i>';
          return '<i class="fa fa-circle pr-3  text-warning" title="غیر فعال"></i>';
        },
      },
      TechnicalExpertApprove: {
        title: 'تایید کارشناس فنی',
        type:'html',
        valuePrepareFunction: (value) => {
          if (value==="1") return '<i class="fa fa-circle pr-3  text-success" title="فعال"></i>';
          return '<i class="fa fa-circle pr-3  text-warning" title="غیر فعال"></i>';
        },
      },
      ArchitecturalExpertApprove: {
        title: 'تایید کارشناس مجری',
        type:'html',
        valuePrepareFunction: (value) => {
          if (value==="1") return '<i class="fa fa-circle pr-3  text-success" title="فعال"></i>';
          return '<i class="fa fa-circle pr-3  text-warning" title="غیر فعال"></i>';
        },
      },
      ExecuterApprove: {
        title: 'تایید مجری',
        type:'html',
        valuePrepareFunction: (value) => {
          if (value==="1") return '<i class="fa fa-circle pr-3  text-success" title="فعال"></i>';
          return '<i class="fa fa-circle pr-3  text-warning" title="غیر فعال"></i>';
        }
      }
    },
    actions: {
      columnTitle: 'عملیات',
      width: '300px',
      custom: [
        {
          name: 'fileManagement',
          title: '<i class="fa fa-images pr-3 ebcs-font-normal text-info" title="تصاویر پلان"></i>'
        },
        {
          name: 'commentAction',
          title: '<i class="fa fa-comment pr-3 ebcs-font-normal text-warning" title="ثبت پیام"></i>'
        },

        // {
        //   name: 'deleteAction',
        //   title: '<i class="fa fa-trash pr-3 ebcs-font-normal text-danger" title="حذف"></i>'
        // }
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  data;

  constructor(
    private halladminsService: HalladminsService,
    private modalService: NgbModal,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.halladminsService.getHallAdminTask().subscribe(res => {
      this.data = res.data.rows;
    });
  }

  methodHandler(e) {
    switch (e.action) {
      case 'fileManagement' : {
        this.fileManagement(e.data);
        break;
      }
      case 'commentAction' : {
        this.commentHandler(e.data);
        break;
      }
    }
  }
  fileManagement(inputModel) {
    inputModel.halladmin=1;
    let modalRef = this.modalService.open(TechnicalexpertFilemanagementComponent, {centered: true, size: 'xl'});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  commentHandler(inputModel) {
    const modalRef = this.modalService.open(HalladminCommentComponent, {centered: true,size:'lg'});
    modalRef.componentInstance.model = inputModel;
  }
}

