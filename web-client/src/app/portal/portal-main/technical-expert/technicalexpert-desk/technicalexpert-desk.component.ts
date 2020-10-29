import { Component, OnInit } from '@angular/core';
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
        title:'شماره غرفه',
      },
      Area: {
        title:'متراژ غرفه',
      },
      Area2: {
        title:'متراژ طبقه دوم',
      },
      ParticipantName: {
        title:'مشارکت کننده',
      },
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
        //   title: '<i class="fa fa-trash pr-3 ebcs-font-normal text-danger" title="Delete"></i>'
        // },
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
      case 'fileManagement' : {
        this.fileManagement(e.data);
        break;
      }
    }
  }

  fileManagement(inputModel) {
    let modalRef=this.modalService.open(TechnicalexpertFilemanagementComponent, {centered: true,size:'xl'});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }
}

