import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {HalladminsService} from "../../hall-admins/halladmins.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {TechnicalexpertFilemanagementComponent} from "../../technical-expert/technicalexpert-desk/technicalexpert-filemanagement/technicalexpert-filemanagement.component";
import {HalladminCommentComponent} from "../../hall-admins/halladmin-desk/halladmin-comment/halladmin-comment.component";
import {GroupModel} from "../../groups/entity";
import {ElectricalExpertService} from "../electrical-expert.service";

@Component({
  selector: 'app-electricalexpert-desk',
  templateUrl: './electricalexpert-desk.component.html',
  styleUrls: ['./electricalexpert-desk.component.css']
})
export class ElectricalexpertDeskComponent extends BaseClass implements OnInit {
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
          name: 'acceptAction',
          title: '<i class="fa fa-check pr-3 ebcs-font-normal text-success" title="تایید"></i>',
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
    private electricalExpertService: ElectricalExpertService,
    private modalService: NgbModal,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.electricalExpertService.getElectricalExpertTask().subscribe(res => {
      this.data = res.data.rows;
    });
  }

  methodHandler(e) {
    switch (e.action) {
      case 'acceptAction' : {
        this.acceptHandler(e.data);
        break;
      }
    }
  }
  acceptHandler(inputModel){
    debugger
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.electricalExpertService.ElectricalExpertAccept(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }

}

