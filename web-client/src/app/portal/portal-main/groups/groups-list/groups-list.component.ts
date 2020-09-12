import {Component, OnInit} from '@angular/core';
import {GroupsService} from '../groups.service';
import {BaseClass} from '../../../../utilities/base';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GroupListCreateComponent} from './group-list-create/group-list-create.component';
import {GroupModel} from '../entity';
import {GroupListEditComponent} from './group-list-edit/group-list-edit.component';

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
    private groupsService: GroupsService,
    private modalService: NgbModal
  ) {
    super();
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
    }
  }

  createHandler() {
    this.modalService.open(GroupListCreateComponent, {centered: true});
  }

  deleteHandler(inputModel) {
    let entity=new GroupModel();
    entity.Id=inputModel.Id;
    this.groupsService.delete(entity).subscribe(res=>{
      if(res.data.result){
        console.log('salam')
      }
    });
  }

  editHandler(inputModel) {
    const modalRef =this.modalService.open(GroupListEditComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
  }
}
