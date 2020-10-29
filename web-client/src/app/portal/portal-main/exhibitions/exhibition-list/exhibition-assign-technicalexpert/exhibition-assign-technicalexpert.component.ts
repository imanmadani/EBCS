import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {ExhibitionsService} from "../../exhibitions.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupModel} from "../../../groups/entity";

@Component({
  selector: 'app-exhibition-assign-technicalexpert',
  templateUrl: './exhibition-assign-technicalexpert.component.html',
  styleUrls: ['./exhibition-assign-technicalexpert.component.css']
})
export class ExhibitionAssignTechnicalexpertComponent extends BaseClass implements OnInit {
  title='افزودن کارشناس فنی';
  formGroup:any ;
  @Output() refresh:EventEmitter<boolean>;
  technicalDropDown;
  dpdown='.....';
  @Input() model;

  settings = {
    columns: {
      Name: {
        title: 'نام کارشناس'
      },
    },
    actions: {
      columnTitle: 'عملیات',
      custom: [
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
    this.createForm();
    this.exhibitionsService.ExgetTechnicalExpertDropDown().subscribe(res=>{
      this.technicalDropDown=res.data.rows;
      this.exhibitionsService.ExgetTechnicalExpertByExhibitionId(this.model.Id).subscribe(resTechnicalExpertList=>{
        this.data=resTechnicalExpertList.data.rows;
      });
    });
  }
  createForm() {
    this.formGroup = new FormGroup({
      ExhibitionId: new FormControl(this.model.Id),
      TechnicalExpertId: new FormControl(null, Validators.required)
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
    this.exhibitionsService.ExDeleteAssignTechnicalExpert(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }
  save() {
    this.exhibitionsService.ExAssignTechnicalExpert(this.formGroup.value).subscribe(res => {
        if (res.data.result) {
          this.success();
          this.ngOnInit();
        } else {
          this.error();
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
    this.formGroup.get('TechnicalExpertId').setValue(e.Id);
  }
}
