import {Component, Input, OnInit} from '@angular/core';
import {PortalParticipantsService} from "../portal-participants.service";
import {RateComponent} from "../../../utilities/component/rate/rate.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GroupModel} from "../../portal-main/groups/entity";
import {BaseClass} from "../../../utilities/base";
import {ToastrService} from "ngx-toastr";
import {ParticipantBoothBoothBuilderModel} from "../entity";

@Component({
  selector: 'app-portal-participant-booth-builder-list',
  templateUrl: './portal-participant-booth-builder-list.component.html',
  styleUrls: ['./portal-participant-booth-builder-list.component.css']
})
export class PortalParticipantBoothBuilderListComponent extends BaseClass implements OnInit {
  @Input()model;
  title="انتخاب غرفه ساز";
  settings = {
    columns: {
      Name: {
        title: 'نام'
      },
      Grade: {
        title: 'گرید'
      },
      Rate: {
        title:'امتیاز',
        type: 'custom',
        renderComponent:RateComponent,
      }
    },
    actions: {
      columnTitle: 'انتخاب',
      custom: [
        {
          name: 'selectAction',
          title: '<i class="fa fa-hand-pointer pr-3 ebcs-font-normal text-warning" title="Edit"></i>'
        }
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  data;
  constructor(private portalParticipantsService: PortalParticipantsService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.portalParticipantsService.getBoothBuilder().subscribe(resBuilderList => {
      this.data = resBuilderList.data.rows;
    });
  }

  close() {
    this.modalService.dismissAll(false);
  }

  methodHandler(e) {
    switch (e.action) {
      case 'selectAction' : {
        this.selectHandler(e.data);
        break;
      }
    }
  }
  selectHandler(inputModel) {
    debugger
    let entity = new ParticipantBoothBoothBuilderModel();
    entity.BoothId = this.model.BoothId;
    entity.BoothBuilderId = inputModel.Id;
    this.portalParticipantsService.selectBoothBuilder(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.modalService.dismissAll(true);
      }
    });
  }
}
