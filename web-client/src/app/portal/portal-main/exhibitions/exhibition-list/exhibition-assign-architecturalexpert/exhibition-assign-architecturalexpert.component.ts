import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {ExhibitionsService} from "../../exhibitions.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupModel} from "../../../groups/entity";

@Component({
  selector: 'app-exhibition-assign-architecturalexpert',
  templateUrl: './exhibition-assign-architecturalexpert.component.html',
  styleUrls: ['./exhibition-assign-architecturalexpert.component.css']
})
export class ExhibitionAssignArchitecturalexpertComponent extends BaseClass implements OnInit {
  title='افزودن کارشناس معماری داخلی';
  formGroup:any ;
  @Output() refresh:EventEmitter<boolean>;
  architecturalDropDown;
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
    this.exhibitionsService.ExgetArchitecturalExpertDropDown().subscribe(res=>{
      this.architecturalDropDown=res.data.rows;
      this.exhibitionsService.ExgetArchitecturalExpertByExhibitionId(this.model.Id).subscribe(resArchitecturalExpertList=>{
        this.data=resArchitecturalExpertList.data.rows;
      });
    });
  }
  createForm() {
    this.formGroup = new FormGroup({
      ExhibitionId: new FormControl(this.model.Id),
      ArchitecturalExpertId: new FormControl(null, Validators.required)
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
    this.exhibitionsService.ExDeleteAssignArchitecturalExpert(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }
  save() {
    this.exhibitionsService.ExAssignArchitecturalExpert(this.formGroup.value).subscribe(res => {
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
    this.formGroup.get('ArchitecturalExpertId').setValue(e.Id);
  }
}
