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
      }
    },
    actions: {
      columnTitle: 'عملیات',
      custom: [
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
      case 'commentAction' : {
        this.commentHandler(e.data);
        break;
      }
    }
  }

  commentHandler(inputModel) {
    const modalRef = this.modalService.open(HalladminCommentComponent, {centered: true,size:'lg'});
    modalRef.componentInstance.model = inputModel;
  }
}

