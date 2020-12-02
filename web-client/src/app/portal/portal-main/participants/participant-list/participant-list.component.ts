import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {HalladminsService} from "../../hall-admins/halladmins.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {HalladminCreateComponent} from "../../hall-admins/halladmin-list/halladmin-create/halladmin-create.component";
import {GroupModel} from "../../groups/entity";
import {HalladminEditComponent} from "../../hall-admins/halladmin-list/halladmin-edit/halladmin-edit.component";
import {ParticipantsService} from "../participants.service";

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      Username: {
        title: 'نام کاربری'
      },
      CompanyName: {
        title: 'نام شرکت'
      },
      Tell: {
        title: 'تلفن'
      },
      EconomicCode: {
        title: 'کد اقتصادی'
      },
      AdminName: {
        title: 'مدیر عامل'
      },
      AdminTell: {
        title: 'تلفن'
      },
      AgentName: {
        title: 'نماینده'
      },
      AgentTell: {
        title: 'تلفن'
      },
      Year: {
        title: 'سال'
      },
      Title: {
        title: 'نمایشگاه'
      },
      HallTitle: {
        title: 'سالن'
      },
      Name: {
        title: 'غرفه'
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
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  data;
  constructor(private participantsService:ParticipantsService,
              protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
    this.participantsService.getByUser().subscribe(res=>{
      debugger;
      this.data = res.data.rows;
    });
  }
}

