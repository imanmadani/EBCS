import {Component, OnInit} from '@angular/core';
import {GroupsService} from "../portal-main/groups/groups.service";
import {PortalParticipantsService} from "./portal-participants.service";
import {ExecuterBoothCreateComponent} from "../portal-main/executers/executer-booth-list/executer-booth-create/executer-booth-create.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {BaseClass} from "../../utilities/base";
import {PortalParticipantBoothBuilderListComponent} from "./portal-participant-booth-builder-list/portal-participant-booth-builder-list.component";
import {PortalParticipantBoothbuilderPointComponent} from "./portal-participant-boothbuilder-point/portal-participant-boothbuilder-point.component";

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

  constructor(private portalParticipantsService: PortalParticipantsService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit() {
    this.portalParticipantsService.getParticipantDetails(1).subscribe(resDetail => {
      this.participantDetail = resDetail.data.row;
      if (!this.participantDetail) {
        this.portalParticipantsService.getDataByParticipant(1).subscribe(res => {
          this.userInformation = res.data.row;
          this.portalParticipantsService.getBoothBuilderByBoothId(this.userInformation.BoothId).subscribe(resBoothBuilder => {
            this.boothBuilder = resBoothBuilder.data.row;
            this.portalParticipantsService.getBoothBuilderRateByBoothId(this.userInformation.BoothId).subscribe(res=>{
              this.rate=res.data.row;
            });
          });
        });
      } else {

      }
    });
  }

  openBoothBuilders() {
    let modalRef = this.modalService.open(PortalParticipantBoothBuilderListComponent, {centered: true});
    modalRef.componentInstance.model=this.userInformation;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  setPoint(boothBuilder) {
    let modalRef = this.modalService.open(PortalParticipantBoothbuilderPointComponent, {centered: true});
    modalRef.componentInstance.model=this.userInformation;
    modalRef.componentInstance.boothBuilder=boothBuilder;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }
}
