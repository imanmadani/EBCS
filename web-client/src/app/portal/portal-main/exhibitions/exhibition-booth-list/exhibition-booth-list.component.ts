import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {ExhibitionsService} from "../exhibitions.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {ExhibitionHallCreateComponent} from "../exhibition-hall-list/exhibition-hall-create/exhibition-hall-create.component";
import {GroupModel} from "../../groups/entity";
import {ExhibitionHallEditComponent} from "../exhibition-hall-list/exhibition-hall-edit/exhibition-hall-edit.component";
import {ExhibitionAssignSalonComponent} from "../exhibition-list/exhibition-assign-salon/exhibition-assign-salon.component";
import {ExhibitionBoothCreateComponent} from "./exhibition-booth-create/exhibition-booth-create.component";
import {ExhibitionBoothEditComponent} from "./exhibition-booth-edit/exhibition-booth-edit.component";

@Component({
  selector: 'app-exhibition-booth-list',
  templateUrl: './exhibition-booth-list.component.html',
  styleUrls: ['./exhibition-booth-list.component.css']
})
export class ExhibitionBoothListComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      ExhibitionId: {
        title: 'نام نمایشگاه'
      },
      HallId: {
        title: 'سالن'
      },
      Name: {
        title: 'شماره غرفه'
      },
      FlagBlock: {
        title: 'وضعیت'
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

  constructor(
    private exhibitionsService: ExhibitionsService,
    private modalService: NgbModal,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.exhibitionsService.Boothget().subscribe(res => {
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
    let modalRef=this.modalService.open(ExhibitionBoothCreateComponent, {centered: true});
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  deleteHandler(inputModel) {
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.exhibitionsService.Boothdelete(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }

  editHandler(inputModel) {
    const modalRef = this.modalService.open(ExhibitionBoothEditComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

}
