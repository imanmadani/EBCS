import {Component, OnInit} from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {BoothbuildersService} from "../../booth-builders/boothbuilders.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {ExhibitionHallCreateComponent} from "../../exhibitions/exhibition-hall-list/exhibition-hall-create/exhibition-hall-create.component";
import {GroupModel} from "../../groups/entity";
import {ExhibitionHallEditComponent} from "../../exhibitions/exhibition-hall-list/exhibition-hall-edit/exhibition-hall-edit.component";
import {BoothbuilderPlanUploadComponent} from "../../booth-builders/boothbuilder-desk/boothbuilder-plan-upload/boothbuilder-plan-upload.component";
import {TechnicalexpertsService} from "../technicalexperts.service";
import {TechnicalexpertFilemanagementComponent} from "./technicalexpert-filemanagement/technicalexpert-filemanagement.component";

@Component({
  selector: 'app-technicalexpert-desk',
  templateUrl: './technicalexpert-desk.component.html',
  styleUrls: ['./technicalexpert-desk.component.css']
})
export class TechnicalexpertDeskComponent extends BaseClass implements OnInit {
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
      AreaRial: {
        title: 'متراژ ریالی'
      },
      AreaArz: {
        title: 'متراژ ارزی'
      },
      AreaType: {
        title: 'نوع غرفه',
        valuePrepareFunction: (value) => {
          if (value === "1") return 'ریالی';
          if (value === "2") return 'ارزی';
          if (value === "3") return 'ارزی - ریالی';
          return '-';
        },
      },
      Area2: {
        title: 'متراژ طبقه دوم'
      },
      ConstructionType: {
        title: 'نوع ساخت',
        valuePrepareFunction: (value) => {
          if (value === "1") return 'پیش ساخته';
          if (value === "2") return 'خود ساز';
          return '-';
        },
      },
      ParticipantName: {
        title: 'مشارکت کننده',
      },
      ApproveState: {
        title: 'وضعیت',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value === "02") return '<i class="fa fa-circle pr-3  text-warning" title="عدم تایید"></i>';
          return '-';
        },
      },
    },
    actions: {
      columnTitle: 'عملیات',
      width: '300px',
      custom: [
        {
          name: 'approveAction',
          title: '<i class="fa fa-check pr-3 ebcs-font-normal text-success" title="تایید"></i>'
        },
        {
          name: 'disApproveAction',
          title: '<i class="fa fa-times pr-3 ebcs-font-normal text-danger" title="عدم تایید"></i>'
        },
        {
          name: 'fileManagement',
          title: '<i class="fa fa-images pr-3 ebcs-font-normal text-info" title="Files"></i>'
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
    private technicalexpertsService: TechnicalexpertsService,
    private modalService: NgbModal,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.technicalexpertsService.getTechnicalExpertTask(1).subscribe(res => {
      this.data = res.data.rows;
    });
  }

  methodHandler(e) {
    switch (e.action) {
      case 'approveAction' : {
        this.approveHandler(e.data);
        break;
      }
      case 'disApproveAction' : {
        this.disAproveHandler(e.data);
        break;
      }
      case 'fileManagement' : {
        this.fileManagement(e.data);
        break;
      }
    }
  }

  fileManagement(inputModel) {
    let modalRef = this.modalService.open(TechnicalexpertFilemanagementComponent, {centered: true, size: 'xl'});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  private approveHandler(inputModel) {
    debugger
    let entity = new GroupModel();
    entity.Id = inputModel.BoothId;
    this.technicalexpertsService.boothApprove(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }

  private disAproveHandler(inputModel) {
    let entity = new GroupModel();
    entity.Id = inputModel.BoothId;
    this.technicalexpertsService.boothDisApprove(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }
}

