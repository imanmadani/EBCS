import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {ExhibitionsService} from "../../exhibitions/exhibitions.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {GroupModel} from "../../groups/entity";
import {ExecuterBoothCreateComponent} from "./executer-booth-create/executer-booth-create.component";
import {ExecuterBoothEditComponent} from "./executer-booth-edit/executer-booth-edit.component";
import {ExecutersService} from "../executers.service";
import {PortalParticipantBoothBuilderListComponent} from "../../../portal-participants/portal-participant-booth-builder-list/portal-participant-booth-builder-list.component";
import {ExecuterBoothBoothbuilderComponent} from "./executer-booth-boothbuilder/executer-booth-boothbuilder.component";

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
      CompanyName: {
        title: 'مشارکت کننده'
      },
      Name: {
        title: 'شماره غرفه'
      },
      AreaRial: {
        title: 'متراژ ریالی'
      },
      AreaArz: {
        title: 'متراژ ارزی'
      },
      AreaTypeTitle: {
        title: 'نوع غرفه',
      },
      ConstructionType: {
        title: 'نوع ساخت',
      },
      Area2: {
        title: 'متراژ طبقه دوم'
      },
      HasEquipment: {
        title: 'تجهیزات',
        type:'html',
        valuePrepareFunction: (value) => {
          if (value==="1") return 'دارد';
          if (value==="2") return 'ندارد';
          return '-';
        },
      },
      BoothbuilderName: {
        title: 'غرفه ساز'
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
        // {
        //   name: 'editAction',
        //   title: '<i class="fa fa-edit pr-3 ebcs-font-normal text-warning" title="ویرایش"></i>'
        // },
        {
          name: 'boothbuilderAction',
          title: '<i class="fa fa-pencil-ruler pr-3 ebcs-font-normal text-warning" title="افزودن غرفه ساز"></i>'
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

  constructor(
    private executersService: ExecutersService,
    private modalService: NgbModal,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.executersService.Boothget().subscribe(res => {
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
      case 'boothbuilderAction' : {
        this.boothBuilderHandler(e.data);
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
  boothBuilderHandler(inputModel) {
    debugger
    let modalRef = this.modalService.open(ExecuterBoothBoothbuilderComponent, {centered: true,size:"lg"});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

}
