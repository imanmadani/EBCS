import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {BaseClass} from "../../../utilities/base";
import {PortalParticipantsService} from "../portal-participants.service";
import {ParticipantBoothBoothBuilderModel} from "../entity";
@Component({
  selector: 'app-portal-participant-boothbuilder-point',
  templateUrl: './portal-participant-boothbuilder-point.component.html',
  styleUrls: ['./portal-participant-boothbuilder-point.component.css']
})
export class PortalParticipantBoothbuilderPointComponent extends BaseClass implements OnInit {
  @Input()model;
  @Input()boothBuilder;
  title="ثبت امتیاز";
  constructor(private portalParticipantsService: PortalParticipantsService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
  }
  close() {
    this.modalService.dismissAll(false);
  }

  setRate(rate) {
    let entity = new ParticipantBoothBoothBuilderModel();
    entity.BoothId = this.model.BoothId;
    entity.BoothBuilderId = this.boothBuilder.Id;
    entity.Rate = +rate;
  this.portalParticipantsService.setBoothBuilderRate(entity).subscribe(res => {
    if (res.data.result) {
      this.success();
      this.modalService.dismissAll(true);
    }
  });
  }
}
