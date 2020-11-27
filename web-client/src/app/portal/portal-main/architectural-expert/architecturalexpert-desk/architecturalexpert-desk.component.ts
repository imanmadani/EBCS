import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {ArchitecturalexpertService} from "../architecturalexpert.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {ArchitecturalexpertEditComponent} from "../architecturalexpert-list/architecturalexpert-edit/architecturalexpert-edit.component";
import {BoothbuilderinfringementSetComponent} from "./boothbuilderinfringement-set/boothbuilderinfringement-set.component";
import {GroupModel} from "../../groups/entity";

@Component({
  selector: 'app-architecturalexpert-desk',
  templateUrl: './architecturalexpert-desk.component.html',
  styleUrls: ['./architecturalexpert-desk.component.css']
})
export class ArchitecturalexpertDeskComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      ExhibitionName: {
        title: 'نام نمایشگاه '
      },
      HallName: {
        title: 'نام سالن'
      },
      BoothName: {
        title: 'شماره غرفه'
      },
      ParticipantName: {
        title: 'مشارکت کننده'
      },
      ApproveState: {
        title: 'وضعیت',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value === "1") return '<i class="fa fa-circle pr-3  text-success" title="تایید"></i>';
          if (value === "2") return '<i class="fa fa-circle pr-3  text-warning" title="عدم تایید"></i>';
          return '-';
        },
      },
    },
    actions: {
      columnTitle: 'عملیات',
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
          name: 'setInfringements',
          title: '<i class="fa fa-exclamation-triangle pr-3 ebcs-font-normal text-danger" title="ثبت تخلف"></i>'
        }
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  data;
  constructor(private architecturalexpertsService:ArchitecturalexpertService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
    this.architecturalexpertsService.getArchitecturalExpertTask().subscribe(res=>{
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
      case 'setInfringements' : {
        this.setInfringementHandler(e.data);
        break;
      }
    }
  }
  setInfringementHandler(inputModel) {
    const modalRef = this.modalService.open(BoothbuilderinfringementSetComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }
  private approveHandler(inputModel) {
    debugger
    let entity = new GroupModel();
    entity.Id = inputModel.BoothId;
    this.architecturalexpertsService.boothApprove(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }

  private disAproveHandler(inputModel) {
    let entity = new GroupModel();
    entity.Id = inputModel.BoothId;
    this.architecturalexpertsService.boothDisApprove(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }
}
