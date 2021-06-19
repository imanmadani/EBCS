import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {ExecutersService} from "../executers.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {ExecuterCreateComponent} from "../executer-list/executer-create/executer-create.component";
import {ExecuterEditComponent} from "../executer-list/executer-edit/executer-edit.component";
import {ExecuterParticipantCreateComponent} from "./executer-participant-create/executer-participant-create.component";

@Component({
  selector: 'app-executer-participant',
  templateUrl: './executer-participant.component.html',
  styleUrls: ['./executer-participant.component.css']
})
export class ExecuterParticipantComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      CompanyName: {
        title: 'نام شرکت'
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
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  data;
  constructor(private executersService:ExecutersService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
    this.executersService.getParticipantByExecuter().subscribe(res=>{
      this.data = res.data.rows;
    });
  }

  methodHandler(e) {
    switch (e.action) {
      case 'editAction' : {
        this.editHandler(e.data);
        break;
      }
    }
  }
  createHandler() {
    let modalRef=this.modalService.open(ExecuterParticipantCreateComponent, {centered: true,size:'xl'});
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }


  editHandler(inputModel) {
    const modalRef = this.modalService.open(ExecuterEditComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }
}
