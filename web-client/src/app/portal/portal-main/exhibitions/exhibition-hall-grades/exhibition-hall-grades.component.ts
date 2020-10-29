import { Component, OnInit } from '@angular/core';
import {BaseClass} from '../../../../utilities/base';
import {ExhibitionsService} from '../exhibitions.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {ExhibitionGradeCreateComponent} from '../exhebition-grades/exhibition-grade-create/exhibition-grade-create.component';
import {GroupModel} from '../../groups/entity';
import {ExhibitionGradeEditComponent} from '../exhebition-grades/exhibition-grade-edit/exhibition-grade-edit.component';
import {ExhibitionHallGradeCreateComponent} from './exhibition-hall-grade-create/exhibition-hall-grade-create.component';
import {ExhibitionHallGradeEditComponent} from './exhibition-hall-grade-edit/exhibition-hall-grade-edit.component';

@Component({
  selector: 'app-exhibition-hall-grades',
  templateUrl: './exhibition-hall-grades.component.html',
  styleUrls: ['./exhibition-hall-grades.component.css']
})
export class ExhibitionHallGradesComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      Title: {
        title: 'گرید'
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
    this.exhibitionsService.HallGradeget().subscribe(res => {
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
    const modalRef =this.modalService.open(ExhibitionHallGradeCreateComponent, {centered: true});
    modalRef.result.then((reason) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  deleteHandler(inputModel) {
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.exhibitionsService.HallGradedelete(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }

  editHandler(inputModel) {
    const modalRef = this.modalService.open(ExhibitionHallGradeEditComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((reason) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

}
