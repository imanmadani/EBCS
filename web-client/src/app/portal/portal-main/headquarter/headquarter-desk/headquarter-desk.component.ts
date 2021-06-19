import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {GroupModel} from "../../groups/entity";
import {HeadquarterService} from "../headquarter.service";

@Component({
  selector: 'app-headquarter-desk',
  templateUrl: './headquarter-desk.component.html',
  styleUrls: ['./headquarter-desk.component.css']
})
export class HeadquarterDeskComponent extends BaseClass implements OnInit {
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
      width: '300px',
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
    private headquarterService: HeadquarterService,
    private modalService: NgbModal,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.headquarterService.getHeadQuarterTask().subscribe(res => {
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
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.headquarterService.HeadQuarterAccept(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }

}

