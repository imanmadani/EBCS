import {Component, OnInit} from '@angular/core';
import {GroupsService} from "../portal-main/groups/groups.service";
import {PortalParticipantsService} from "./portal-participants.service";
import {ExecuterBoothCreateComponent} from "../portal-main/executers/executer-booth-list/executer-booth-create/executer-booth-create.component";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {BaseClass} from "../../utilities/base";
import {PortalParticipantBoothBuilderListComponent} from "./portal-participant-booth-builder-list/portal-participant-booth-builder-list.component";
import {PortalParticipantBoothbuilderPointComponent} from "./portal-participant-boothbuilder-point/portal-participant-boothbuilder-point.component";
import {PortalParticipantPolicyformComponent} from "./portal-participant-policyform/portal-participant-policyform.component";

@Component({
  selector: 'app-portal-participants',
  templateUrl: './portal-participants.component.html',
  styleUrls: ['./portal-participants.component.css']
})
export class PortalParticipantsComponent extends BaseClass implements OnInit {
  userInformation;
  boothBuilder;
  participantDetail;
  rate;
  text: any = {
    Year: 'سال',
    Month: 'ماه',
    Days: "روز",
    Hours: "ساعت",
    Minutes: "دقیقه"
  };
  userdetail;

  constructor(private portalParticipantsService: PortalParticipantsService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit() {
    this.portalParticipantsService.getUserByToken().subscribe(resParticipant => {
      debugger
      this.userdetail = resParticipant.data.row;
      if(this.userdetail.PolicyApprove==="1") {
        this.portalParticipantsService.getDataByParticipant(this.userdetail.Id).subscribe(res => {
          this.userInformation = res.data.row;
          this.portalParticipantsService.getBoothBuilderByBoothId(this.userInformation.BoothId).subscribe(resBoothBuilder => {
            this.boothBuilder = resBoothBuilder.data.row;
            this.portalParticipantsService.getBoothBuilderRateByBoothId(this.userInformation.BoothId).subscribe(res => {
              this.rate = res.data.row;
            });
          });
        });
      }
      else {
        let modalRef = this.modalService.open(PortalParticipantPolicyformComponent,{centered: true, size: "lg"});
        modalRef.componentInstance.model = this.userdetail;
        modalRef.result.then((data) => {
        }, (reason) => {
          this.ngOnInit();
        });
      }
    });
  }

  openBoothBuilders() {
    let modalRef = this.modalService.open(PortalParticipantBoothBuilderListComponent, {centered: true,size:"lg"});
    modalRef.componentInstance.model = this.userInformation;
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  setPoint(boothBuilder) {
    let modalRef = this.modalService.open(PortalParticipantBoothbuilderPointComponent, {centered: true});
    modalRef.componentInstance.model = this.userInformation;
    modalRef.componentInstance.boothBuilder = boothBuilder;
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }
}
