import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {ExhibitionsService} from "../../exhibitions/exhibitions.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {GroupModel} from "../../groups/entity";
import {ExecuterBoothCreateComponent} from "./executer-booth-create/executer-booth-create.component";
import {ExecuterBoothEditComponent} from "./executer-booth-edit/executer-booth-edit.component";
import {ExecutersService} from "../executers.service";

@Component({
  selector: 'app-exhibition-booth-list',
  templateUrl: './executer-booth-list.component.html',
  styleUrls: ['./executer-booth-list.component.css']
})
export class ExecuterBoothListComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      ExName: {
        title: 'نام نمایشگاه'
      },
      HallTitle: {
        title: 'سالن'
      },
      ParticipantUsername: {
        title: 'مشارکت کننده'
      },
      Name: {
        title: 'شماره غرفه'
      },
      Area: {
        title: 'متراژ غرفه'
      },
      Area2: {
        title: 'متراژ طبقه دوم'
      },
      FlagBlock: {
        title: 'وضعیت',
        type:'html',
        valuePrepareFunction: (value) => {
          debugger
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
    private executersService: ExecutersService,
    private modalService: NgbModal,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.executersService.Boothget().subscribe(res => {
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
    let modalRef=this.modalService.open(ExecuterBoothCreateComponent, {centered: true});
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  deleteHandler(inputModel) {
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.executersService.Boothdelete(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }

  editHandler(inputModel) {
    const modalRef = this.modalService.open(ExecuterBoothEditComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

}
