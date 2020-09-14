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
import {ExhibitionListCreateComponent} from './exhibition-list-create/exhibition-list-create.component';
import {ExhibitionListEditComponent} from './exhibition-list-edit/exhibition-list-edit.component';

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
          name: 'assignAccess',
          title: '<i class="fa fa-key pr-3 ebcs-font-normal text-success"  title="Access"></i>'
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
    }
  }

  createHandler() {
    let modalRef=this.modalService.open(ExhibitionListCreateComponent, {centered: true});
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
    const modalRef = this.modalService.open(ExhibitionListEditComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

}
