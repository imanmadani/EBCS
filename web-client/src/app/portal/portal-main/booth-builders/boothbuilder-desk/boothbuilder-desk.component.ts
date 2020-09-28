import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {RateComponent} from "../../../../utilities/component/rate/rate.component";
import {BoothbuildersService} from "../boothbuilders.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {ExhibitionHallCreateComponent} from "../../exhibitions/exhibition-hall-list/exhibition-hall-create/exhibition-hall-create.component";
import {GroupModel} from "../../groups/entity";
import {ExhibitionHallEditComponent} from "../../exhibitions/exhibition-hall-list/exhibition-hall-edit/exhibition-hall-edit.component";

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
        title: 'سالن'
      },
      BoothName: {
        title:'شماره غرفه',
      },
      ParticipantName: {
        title:'مشارکت کننده',
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
    private boothBuilderService: BoothbuildersService,
    private modalService: NgbModal,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.boothBuilderService.getBoothBuilderTask(1).subscribe(res => {
      this.data = res.data.rows;
      console.log(this.data)
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
}

