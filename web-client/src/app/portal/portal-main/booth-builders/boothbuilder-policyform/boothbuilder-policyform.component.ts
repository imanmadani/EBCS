import {Component, Input, OnInit} from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {PortalParticipantsService} from "../../../portal-participants/portal-participants.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {BoothbuildersService} from "../boothbuilders.service";

@Component({
  selector: 'app-boothbuilder-policyform',
  templateUrl: './boothbuilder-policyform.component.html',
  styleUrls: ['./boothbuilder-policyform.component.css']
})
export class BoothbuilderPolicyformComponent extends BaseClass implements OnInit {
  @Input() model;

  constructor(private boothBuilderService: BoothbuildersService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
  }

  saveForm() {
    this.boothBuilderService.acceptPolicyForm(this.model).subscribe(res=>{
      if (res.data.result) {
        this.success();
        this.modalService.dismissAll(true);
      }
    });
  }
}
