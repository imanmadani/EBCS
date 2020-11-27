import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {ExhibitionHallCreateComponent} from "../../exhibitions/exhibition-hall-list/exhibition-hall-create/exhibition-hall-create.component";
import {GroupModel} from "../../groups/entity";
import {ExhibitionHallEditComponent} from "../../exhibitions/exhibition-hall-list/exhibition-hall-edit/exhibition-hall-edit.component";
import {FinancialexpertService} from "../financialexpert.service";

@Component({
  selector: 'app-financialexpert-desk',
  templateUrl: './financialexpert-desk.component.html',
  styleUrls: ['./financialexpert-desk.component.css']
})
export class FinancialexpertDeskComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      ExName: {
        title: 'نام نمایشگاه'
      },
      HallTitle: {
        title: 'نام سالن'
      },
      Name: {
        title: 'شماره غرفه'
      },
      ParticipantUsername: {
        title: 'مشارکت کننده'
      },
      BillType: {
        title: 'شرح پرداخت'
      },
      Quantity: {
        title: 'مقدار'
      },
      QuantityType: {
        title: 'واحد'
      },
      Amount: {
        title: 'مبلغ'
      },
      // FinancialApprove: {
      //   title: 'وضعیت پرداخت',
      //   type:'html',
      //   valuePrepareFunction: (value) => {
      //     if (value==="1") return '<i class="fa fa-circle pr-3  text-success" title="تایید شده"></i>';
      //     return '<i class="fa fa-circle pr-3  text-warning" title="تایید نشده"></i>';
      //   },
      // },
    },
    actions: {
      columnTitle: 'عملیات',
      custom: [
        {
          name: 'acceptAction',
          title: '<i class="fa fa-check pr-3 ebcs-font-normal text-success" title="Accept"></i>',
        }
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    }
  };
  data;

  constructor(
    private financialexpertsService: FinancialexpertService,
    private modalService: NgbModal,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.financialexpertsService.getFinancialExpertTask().subscribe(res => {
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
      case 'acceptAction' : {
        this.acceptHandler(e.data);
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
    this.financialexpertsService.FinancialExpertdelete(entity).subscribe(res => {
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
  acceptHandler(inputModel){
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.financialexpertsService.FinancialExpertAccept(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }
}

