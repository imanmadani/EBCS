import {Component, Input, OnInit} from '@angular/core';
import {PortalParticipantsService} from "../portal-participants.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {BaseClass} from "../../../utilities/base";

@Component({
  selector: 'app-portal-participant-policyform',
  templateUrl: './portal-participant-policyform.component.html',
  styleUrls: ['./portal-participant-policyform.component.css']
})
export class PortalParticipantPolicyformComponent extends BaseClass implements OnInit {
  @Input() model;

  constructor(private portalParticipantsService: PortalParticipantsService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
  }

  saveForm() {
    this.portalParticipantsService.acceptPolicyForm(this.model).subscribe(res=>{
      if (res.data.result) {
        this.success();
        this.modalService.dismissAll(true);
      }
    });
  }
}
