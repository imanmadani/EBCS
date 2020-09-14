import { Component, OnInit } from '@angular/core';
import {BaseClass} from '../../../../utilities/base';
import {GroupsService} from '../../groups/groups.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {GroupListCreateComponent} from '../../groups/groups-list/group-list-create/group-list-create.component';
import {GroupModel} from '../../groups/entity';
import {GroupListEditComponent} from '../../groups/groups-list/group-list-edit/group-list-edit.component';
import {GroupListAssignComponent} from '../../groups/groups-list/group-list-assign/group-list-assign.component';
import {ExhibitionsService} from '../exhibitions.service';
import {ExhibitionGradeCreateComponent} from './exhibition-grade-create/exhibition-grade-create.component';
import {ExhibitionGradeEditComponent} from './exhibition-grade-edit/exhibition-grade-edit.component';

@Component({
  selector: 'app-exhebition-grades',
  templateUrl: './exhebition-grades.component.html',
  styleUrls: ['./exhebition-grades.component.css']
})
export class ExhebitionGradesComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      Title: {
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
    this.exhibitionsService.get().subscribe(res => {
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
    }
  }

  createHandler() {
    const modalRef =this.modalService.open(ExhibitionGradeCreateComponent, {centered: true});
    modalRef.result.then((reason) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  deleteHandler(inputModel) {
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.exhibitionsService.delete(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }

  editHandler(inputModel) {
    const modalRef = this.modalService.open(ExhibitionGradeEditComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((reason) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

}
