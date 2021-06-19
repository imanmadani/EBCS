import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupModel} from "../../../groups/entity";
import {ExecutersService} from "../../executers.service";

@Component({
  selector: 'app-executerhall-halladmin',
  templateUrl: './executerhall-halladmin.component.html',
  styleUrls: ['./executerhall-halladmin.component.css']
})
export class ExecuterhallHalladminComponent extends BaseClass implements OnInit {
  title='افزودن مدیر سالن';
  formGroup:any ;
  @Output() refresh:EventEmitter<boolean>;
  halladminDropDown;
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
    private executersService: ExecutersService,
    private modalService: NgbModal,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.createForm();
    this.executersService.getHalladminDropDown(this.model.ExhibitionId).subscribe(res=>{
      this.halladminDropDown=res.data.rows;
      this.executersService.getHalladminByExhibitionHallId(this.model.Id).subscribe(reshalladminList=>{
        this.data=reshalladminList.data.rows;
      });
    });
  }
  createForm() {
    this.formGroup = new FormGroup({
      ExhibitionHallId: new FormControl(this.model.Id),
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
    debugger
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.executersService.deleteAssignHalladmin(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }
  save() {
    let find=this.data?.filter(res=>res.HallAdminId===this.formGroup.get('HallAdminId').value);
    if(find && find.length>0){
      this.error('ایتم تکراریست')
    }else {
      this.executersService.assignHalladmin(this.formGroup.value).subscribe(res => {
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

  }
  close() {
    this.modalService.dismissAll(false);
  }


  changeDropDown(e) {
    debugger
    this.dpdown=e.Title;
    this.formGroup.get('HallAdminId').setValue(e.HallAdminId);
  }
}
