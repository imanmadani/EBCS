import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {ExhibitionsService} from "../../exhibitions.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupModel} from "../../../groups/entity";

@Component({
  selector: 'app-exhibition-hall-assign-admin',
  templateUrl: './exhibition-hall-assign-admin.component.html',
  styleUrls: ['./exhibition-hall-assign-admin.component.css']
})
export class ExhibitionHallAssignAdminComponent extends BaseClass implements OnInit {
  title='افزودن مدیر سالن';
  formGroup:any ;
  @Output() refresh:EventEmitter<boolean>;
  hallAdminDropDown;
  dpdown='.....';
  @Input() model;

  settings = {
    columns: {
      Name: {
        title: 'نام مدیر سالن'
      },
    },
    actions: {
      columnTitle: 'عملیات',
      width: '300px',
      custom: [
        {
          name: 'deleteAction',
          title: '<i class="fa fa-trash pr-3 ebcs-font-normal text-danger" title="حذف"></i>'
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
    this.createForm();
    this.exhibitionsService.ExgetExecuterDropDown().subscribe(res=>{
      this.hallAdminDropDown=res.data.rows;
      this.exhibitionsService.ExgetExecuterByExhibitionId(this.model.Id).subscribe(resExecuterList=>{
        this.data=resExecuterList.data.rows;
      });
    });
  }
  createForm() {
    this.formGroup = new FormGroup({
      HallId: new FormControl(this.model.Id),
      HallAdminId: new FormControl(null, Validators.required)
    });
  }
  methodHandler(e) {
    switch (e.action) {
      case 'deleteAction' : {
        this.deleteHandler(e.data);
        break;
      }
    }
  }
  deleteHandler(inputModel) {
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.exhibitionsService.ExDeleteAssignHallAdmin(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }
  save() {
    this.exhibitionsService.ExAssignHallAdmin(this.formGroup.value).subscribe(res => {
        if (res.data.result) {
          this.success();
          this.ngOnInit();
        } else {
          this.error(res.message);
        }
      },
      (err) => {
        this.error(err.error);
      });

  }
  close() {
    this.modalService.dismissAll(false);
  }


  changeDropDown(e) {
    this.dpdown=e.Title;
    this.formGroup.get('HallId').setValue(e.Id);
  }
}

