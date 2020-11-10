import {Component, OnInit} from '@angular/core';
import {BaseClass} from '../../../../utilities/base';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {GroupModel} from '../../groups/entity';
import {ExhibitionsService} from '../exhibitions.service';
import {ExhibitionAssignSalonComponent} from './exhibition-assign-salon/exhibition-assign-salon.component';
import {ExhibitionAssignExecuterComponent} from "./exhibition-assign-executer/exhibition-assign-executer.component";
import {ExhibitionListCreateComponent} from "./exhibition-list-create/exhibition-list-create.component";
import {ExhibitionListEditComponent} from "./exhibition-list-edit/exhibition-list-edit.component";
import {ExhibitionAssignTechnicalexpertComponent} from "./exhibition-assign-technicalexpert/exhibition-assign-technicalexpert.component";
import {ExhibitionAssignArchitecturalexpertComponent} from "./exhibition-assign-architecturalexpert/exhibition-assign-architecturalexpert.component";
import * as moment from 'jalali-moment';
import {ExhibitionAssignHalladminComponent} from "./exhibition-assign-halladmin/exhibition-assign-halladmin.component";

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
        title: 'سال',
        width:"100px"
      },
      Grade: {
        title: 'گرید',
        width:"100px"

      },
      StartDateTime: {
        title: 'زمان شروع',
        valuePrepareFunction: (value) => {
          if (value==='0000-00-00 00:00:00') return '-';
          let t=moment(value, 'YYYY/MM/DD hh:mm:ss').locale('fa').format('hh:mm:ss YYYY/MM/DD');
          return t;
        },

      },
      EndDateTime: {
        title: 'زمان پایان',
        valuePrepareFunction: (value) => {
          if (value === "0000-00-00 00:00:00") return '-';
          let t=moment(value, 'YYYY/MM/DD hh:mm:ss').locale('fa').format('hh:mm:ss YYYY/MM/DD');
          return t;
        },
      },
      FlagBlock: {
        title: 'وضعیت',
        type: 'html',
        width:"100px",
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
        {
          name: 'assignTechnicalExpert',
          title: '<i class="fa fa-pencil-ruler pr-3 ebcs-font-normal text-success"  title="Assign Technical Expert"></i>'
        },
        {
          name: 'assignArchitecturalExpert',
          title: '<i class="fa fa-drafting-compass pr-3 ebcs-font-normal text-success"  title="Assign Architectural Expert"></i>'
        },
        {
          name: 'assignHalladmin',
          title: '<i class="fa fa-user-edit pr-3 ebcs-font-normal text-success"  title="تخصیص مدیر سالن"></i>'
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
      case 'assignTechnicalExpert' : {
        this.assignTechnicalExpertHandler(e.data);
        break;
      }
      case 'assignArchitecturalExpert' : {
        this.assignArchitecturalExpertHandler(e.data);
        break;
      }
      case 'assignHalladmin' : {
        this.assignHalladminHandler(e.data);
        break;
      }
    }
  }

  createHandler() {
    let modalRef = this.modalService.open(ExhibitionListCreateComponent, {centered: true});
    modalRef.result.then((data) => {
    }, (reason) => {
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
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  assignSalonHandler(inputModel) {
    const modalRef = this.modalService.open(ExhibitionAssignSalonComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  assignExecuterHandler(inputModel) {
    const modalRef = this.modalService.open(ExhibitionAssignExecuterComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  assignTechnicalExpertHandler(inputModel) {
    const modalRef = this.modalService.open(ExhibitionAssignTechnicalexpertComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  assignArchitecturalExpertHandler(inputModel) {
    const modalRef = this.modalService.open(ExhibitionAssignArchitecturalexpertComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }
  assignHalladminHandler(inputModel) {
    const modalRef = this.modalService.open(ExhibitionAssignHalladminComponent, {centered: true});
    modalRef.componentInstance.model = inputModel;
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

}
