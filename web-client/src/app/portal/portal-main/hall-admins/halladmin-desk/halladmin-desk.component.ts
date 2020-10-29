import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {BoothbuildersService} from "../../booth-builders/boothbuilders.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {ExhibitionHallCreateComponent} from "../../exhibitions/exhibition-hall-list/exhibition-hall-create/exhibition-hall-create.component";
import {GroupModel} from "../../groups/entity";
import {ExhibitionHallEditComponent} from "../../exhibitions/exhibition-hall-list/exhibition-hall-edit/exhibition-hall-edit.component";
import {HalladminsService} from "../halladmins.service";

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
        // {
        //   name: 'editAction',
        //   title: '<i class="fa fa-edit pr-3 ebcs-font-normal text-warning" title="Edit"></i>'
        // },
        // {
        //   name: 'deleteAction',
        //   title: '<i class="fa fa-trash pr-3 ebcs-font-normal text-danger" title="Edit"></i>'
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
    let modalRef=this.modalService.open(ExhibitionHallCreateComponent, {centered: true});
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
    const modalRef = this.modalService.open(ExhibitionHallEditComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }
}

