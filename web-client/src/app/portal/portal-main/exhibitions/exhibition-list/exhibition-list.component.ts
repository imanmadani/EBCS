import { Component, OnInit } from '@angular/core';
import {BaseClass} from '../../../../utilities/base';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {GroupModel} from '../../groups/entity';
import {ExhibitionsService} from '../exhibitions.service';
import {ExhibitionHallCreateComponent} from '../exhibition-hall-list/exhibition-hall-create/exhibition-hall-create.component';
import {ExhibitionHallEditComponent} from '../exhibition-hall-list/exhibition-hall-edit/exhibition-hall-edit.component';
import {ExhibitionAssignSalonComponent} from './exhibition-assign-salon/exhibition-assign-salon.component';
import {ExhibitionAssignExecuterComponent} from "./exhibition-assign-executer/exhibition-assign-executer.component";

@Component({
  selector: 'app-exhibition-list',
  templateUrl: './exhibition-list.component.html',
  styleUrls: ['./exhibition-list.component.css']
})
export class ExhibitionListComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      Title: {
        title: 'عنوان'
      },
      Year: {
        title: 'سال'
      },
      GradeId: {
        title: 'گرید'
      },
      FlagBlock: {
        title: 'وضعیت'
      }
    },
    actions: {
      columnTitle: 'عملیات',
      custom: [
        {
          name: 'editAction',
          title: '<i class="fa fa-edit pr-3 ebcs-font-normal text-warning" title="Edit"></i>'
        },
        {
          name: 'deleteAction',
          title: '<i class="fa fa-trash pr-3 ebcs-font-normal text-danger" title="Edit"></i>'
        },
        {
          name: 'assignSalon',
          title: '<i class="fa fa-sitemap pr-3 ebcs-font-normal text-success"  title="Assign Salon"></i>'
        },
        {
          name: 'assignExecuter',
          title: '<i class="fa fa-user-tie pr-3 ebcs-font-normal text-success"  title="Assign Executer"></i>'
        },
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  data;

  constructor(
    private exhibitionsService: ExhibitionsService,
    private modalService: NgbModal,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.exhibitionsService.Exget().subscribe(res => {
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
      case 'assignSalon' : {
        this.assignSalonHandler(e.data);
        break;
      }
      case 'assignExecuter' : {
        this.assignExecuterHandler(e.data);
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
    this.exhibitionsService.Exdelete(entity).subscribe(res => {
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
  assignSalonHandler(inputModel) {
    const modalRef = this.modalService.open(ExhibitionAssignSalonComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }
  assignExecuterHandler(inputModel){
    const modalRef = this.modalService.open(ExhibitionAssignExecuterComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

}
