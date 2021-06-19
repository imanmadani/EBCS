import {Component, Input, OnInit} from '@angular/core';
import {RateComponent} from "../../../../../utilities/component/rate/rate.component";
import {PortalParticipantsService} from "../../../../portal-participants/portal-participants.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {ParticipantBoothBoothBuilderModel} from "../../../../portal-participants/entity";
import {BaseClass} from "../../../../../utilities/base";
import {ExecutersService} from "../../executers.service";

@Component({
  selector: 'app-executer-booth-boothbuilder',
  templateUrl: './executer-booth-boothbuilder.component.html',
  styleUrls: ['./executer-booth-boothbuilder.component.css']
})
export class ExecuterBoothBoothbuilderComponent extends BaseClass implements OnInit {
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
  constructor(    private executersService: ExecutersService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.executersService.getBoothBuilder().subscribe(resBuilderList => {
      debugger
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
    entity.BoothId = this.model.Id;
    entity.BoothBuilderId = inputModel.Id;
    this.executersService.selectBoothBuilder(entity).subscribe(res => {
      debugger
      if (res.data.result) {
        this.success();
        this.modalService.dismissAll(true);
      }
    });
  }

}
