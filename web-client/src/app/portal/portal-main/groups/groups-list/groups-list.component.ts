import {Component, OnInit} from '@angular/core';
import {GroupsService} from '../groups.service';
import {BaseClass} from '../../../../utilities/base';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupListCreateComponent} from './group-list-create/group-list-create.component';
import {GroupModel} from '../entity';
import {GroupListEditComponent} from './group-list-edit/group-list-edit.component';
import {ToastrService} from 'ngx-toastr';
import {GroupListAssignComponent} from './group-list-assign/group-list-assign.component';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      Name: {
        title: 'نام گروه'
      },
      FlagBlock: {
        title: 'وضعیت',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value === "0") return '<i class="fa fa-circle pr-3  text-success" title="فعال"></i>';
          return '<i class="fa fa-circle pr-3  text-warning" title="غیر فعال"></i>';
        },
      }
    },
    actions: {
      columnTitle: 'عملیات',
      custom: [
        {
          name: 'editAction',
          title: '<i class="fa fa-ExGradeedit pr-3 ebcs-font-normal text-warning" title="Edit"></i>'
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
    private groupsService: GroupsService,
    private modalService: NgbModal,
    private router: Router,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.groupsService.get().subscribe(res => {
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
      case 'assignAccess' : {
        this.assignHandler(e.data);
        break;
      }
    }
  }

  createHandler() {
    let modalRef = this.modalService.open(GroupListCreateComponent, {centered: true});
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  deleteHandler(inputModel) {
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    if (entity.Id > 7) {
      this.groupsService.delete(entity).subscribe(res => {
        if (res.data.result) {
          this.success();
          this.ngOnInit();
        }
      });
    } else {
      this.error('امکان حذف این گروه وجود ندارد')
    }
  }

  editHandler(inputModel) {
    const modalRef = this.modalService.open(GroupListEditComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((reason) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  assignHandler(inputModel) {
    const modalRef = this.modalService.open(GroupListAssignComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }
}
