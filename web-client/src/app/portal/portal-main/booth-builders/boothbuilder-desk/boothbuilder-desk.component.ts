import {Component, OnInit} from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {BoothbuildersService} from "../boothbuilders.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {ExhibitionHallCreateComponent} from "../../exhibitions/exhibition-hall-list/exhibition-hall-create/exhibition-hall-create.component";
import {GroupModel} from "../../groups/entity";
import {BoothbuilderPlanUploadComponent} from "./boothbuilder-plan-upload/boothbuilder-plan-upload.component";
import {BoothbuilderPolicyformComponent} from "../boothbuilder-policyform/boothbuilder-policyform.component";
import {BoothbuilderChangeboothtypeComponent} from "./boothbuilder-changeboothtype/boothbuilder-changeboothtype.component";
import {Router} from "@angular/router";
import {PaymentresultService} from "../../paymentresult/paymentresult.service";
import {PortalMainDashboardService} from "../../portal-main-dashbord/portal-main-dashboard.service";

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
        title: 'سالن',
        width: "150px",

      },
      BoothName: {
        title: 'شماره غرفه',
        width: "150px",

      },
      AreaRial: {
        title: 'متراژ ریالی',

      },
      AreaArz: {
        title: 'متراژ ارزی',

      },
      Area2: {
        title: 'متراژ طبقه دوم',

      },
      ParticipantName: {
        title: 'مشارکت کننده',
      },
      CompanyName: {
        title: 'نام شرکت',
      },
      PayStatus: {
        title: 'وضعیت پرداخت',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value === "1") return '<i class="fa fa-circle pr-3  text-success" title="فعال"></i>';
          return '<i class="fa fa-circle pr-3  text-warning" title="غیر فعال"></i>';
        },
      },
      FlagBlock: {
        title: 'وضعیت',
        type: 'html',
        width: "100px",
        valuePrepareFunction: (value) => {
          if (value === "0") return '<i class="fa fa-circle pr-3  text-success" title="فعال"></i>';
          return '<i class="fa fa-circle pr-3  text-warning" title="غیر فعال"></i>';
        },
      }
    },
    actions: {
      columnTitle: 'عملیات',
      custom: [
        // {
        //   name: 'editAction',
        //   title: '<i class="fa fa-edit pr-3 ebcs-font-normal text-warning" title="نوع ساخت"></i>'
        // },
        // {
        //   name: 'deleteAction',
        //   title: '<i class="fa fa-trash pr-3 ebcs-font-normal text-danger" title="حذف"></i>'
        // },
        {
          name: 'uploadAction',
          title: '<i class="fa fa-upload pr-3 ebcs-font-normal text-info" title="آپلود"></i>'
        },
        {
          name: 'paymentAction',
          title: '<i class="fa fa-money-bill-wave pr-3 ebcs-font-normal text-primary" title="پرداخت"></i>'
        },
        {
          name: 'endActionAction',
          title: '<i class="fa fa-check pr-3 ebcs-font-normal text-info" title="نهایی کردن"></i>'
        },
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  data;
  verhoeff = null;
  userdetail;

  constructor(
    private boothBuilderService: BoothbuildersService,
    private paymentresultService: PaymentresultService,
    private modalService: NgbModal,
    private router: Router,
    private portalMainDashboardService: PortalMainDashboardService,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.boothBuilderService.getByToken().subscribe(resUser => {
      this.userdetail = resUser.data.row;
      if (this.userdetail.PolicyApprove === '1') {
        this.boothBuilderService.getBoothBuilderTask().subscribe(res => {
          this.data = res.data.rows;
        });
      } else {
        let modalRef = this.modalService.open(BoothbuilderPolicyformComponent, {centered: true, size: "lg"});
        modalRef.componentInstance.model = this.userdetail;
        modalRef.result.then((data) => {
        }, (reason) => {
          this.ngOnInit();
        });
      }
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
      case 'uploadAction' : {
        this.planUpdateHandler(e.data);
        break;
      }
      case 'endActionAction' : {
        this.endActionHandler(e.data);
        break;
      }
      case 'paymentAction' : {
        this.paymentHandler(e.data);
        break;
      }
    }
  }

  createHandler() {
    let modalRef = this.modalService.open(ExhibitionHallCreateComponent, {centered: true});
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  deleteHandler(inputModel) {
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.boothBuilderService.deletePlan(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }

  editHandler(inputModel) {
    const modalRef = this.modalService.open(BoothbuilderChangeboothtypeComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  planUpdateHandler(inputModel) {
    let modalRef = this.modalService.open(BoothbuilderPlanUploadComponent, {centered: true, size: 'xl'});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  endActionHandler(inputModel) {
    debugger;
    if (+inputModel.PayStatus > 0) {
      let entity = new GroupModel();
      entity.Id = inputModel.BoothId;
      this.boothBuilderService.endAction(entity).subscribe(res => {
        if (res.data.result) {
          this.success();
          this.ngOnInit();
        }
      });
    } else {
      this.error("ابتدا پرداخت را انجام دهید")
    }
  }

  paymentHandler(inputModel) {
    this.paymentresultService.getBillStatusByBoothId(inputModel).subscribe(statusRef => {
        debugger
        if (statusRef.data.row.PayStatus !== '1') {
          if (statusRef.data.row.AreaArz > 0) {
            this.portalMainDashboardService.getLatestCurrency().subscribe(res => {
              if (res.data.row) {
                let output = +res.data.row.UnitPrice;
                let fi = 70000;
                let fiArz=5;
                let amount = 0;
                let amount2 = 0;
                let temp = ((+statusRef.data.row.AreaRial + +statusRef.data.row.Area2) * fi) + 300000;
                amount = temp + (temp * 9 / 100);
                let temp2 = ((+statusRef.data.row.AreaArz) * fiArz * output);
                amount2 = temp2 + (temp2 * 9 / 100);
                inputModel.Amount = amount + amount2;
                this.boothBuilderService.getIdentity(inputModel).subscribe(res => {
                  this.verhoeff = res.data.row;
                  window.location.href = res.data.row;
                });
              }else {
                this.error("نرخ ارز برای امروز مشخص نیست لطفا بعدا تلاش کنید");
              }
            });
          } else {
            let fi = 70000;
            let amount = 0;
            let temp = ((+statusRef.data.row.AreaRial + +statusRef.data.row.Area2) * fi) + 300000;
            amount = temp + (temp * 9 / 100);
            inputModel.Amount = amount
            this.boothBuilderService.getIdentity(inputModel).subscribe(res => {
              this.verhoeff = res.data.row;
              window.location.href = res.data.row;
            });
          }
        } else {
          this.error("پرداخت انجام شده است")
        }
      }
    );
  }
}

