import { Component, OnInit } from '@angular/core';
import {BaseClass} from '../../../../utilities/base';
import {ExhibitionsService} from '../exhibitions.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {ExhibitionListCreateComponent} from '../exhibition-list/exhibition-list-create/exhibition-list-create.component';
import {GroupModel} from '../../groups/entity';
import {ExhibitionListEditComponent} from '../exhibition-list/exhibition-list-edit/exhibition-list-edit.component';
import {ExhibitionHallCreateComponent} from './exhibition-hall-create/exhibition-hall-create.component';
import {ExhibitionHallEditComponent} from './exhibition-hall-edit/exhibition-hall-edit.component';

@Component({
  selector: 'app-exhibition-hall-list',
  templateUrl: './exhibition-hall-list.component.html',
  styleUrls: ['./exhibition-hall-list.component.css']
})
export class ExhibitionHallListComponent extends BaseClass implements OnInit {
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
        }
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
    this.exhibitionsService.Hallget().subscribe(res => {
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
    let modalRef=this.modalService.open(ExhibitionHallCreateComponent, {centered: true});
    modalRef.result.then((data) => {}, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  deleteHandler(inputModel) {
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.exhibitionsService.Halldelete(entity).subscribe(res => {
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

}
