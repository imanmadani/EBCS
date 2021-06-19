import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {BoothbuildersService} from "../../boothbuilders.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from "jalali-moment";

@Component({
  selector: 'app-boothbuilder-edit',
  templateUrl: './boothbuilder-edit.component.html',
  styleUrls: ['./boothbuilder-edit.component.css']
})
export class BoothbuilderEditComponent extends BaseClass implements OnInit {
  title='تغییر گرید';
  formGroup:any ;
  @Input() model;
  @Output() refresh:EventEmitter<boolean>;
  boothBuilderGradeDropDown;
  boothBuilderGradedpdown;
  constructor(private boothbuildersService: BoothbuildersService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.createForm();
    this.boothbuildersService.getBoothBuilderGradeDropDown().subscribe(res => {
      this.boothBuilderGradeDropDown = res.data.rows;
    });
  }
  createForm() {
    this.formGroup = new FormGroup({
      UserId: new FormControl(this.model.UserId),
      GradeId: new FormControl(this.model.GradeId, Validators.required),
      Mobile: new FormControl(this.model.Mobile, Validators.required),
      Name: new FormControl(this.model.Name, Validators.required),
    });
  }
  save() {
    if (this.formGroup.valid === true) {
      this.boothbuildersService.editBoothGrade(this.formGroup.value).subscribe(res => {
          if (res.data.result) {
            this.success();
            this.modalService.dismissAll(true);
          } else {
            this.error(res.message);
          }
        },
        (err) => {
          this.error(err.error);
        });
    } else {
      // this.validateAllFormFields(this.formGroup);
    }
  }
  close(){
    this.modalService.dismissAll(false);
  }


  setBoothBuilderGradeData(e){
    this.boothBuilderGradedpdown = e.Title;
    this.formGroup.get('GradeId').setValue(e.Id);
  }
}
