import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BoothbuildersService} from "../../boothbuilders.service";

@Component({
  selector: 'app-boothbuilder-grade-edit',
  templateUrl: './boothbuilder-grade-edit.component.html',
  styleUrls: ['./boothbuilder-grade-edit.component.css']
})
export class BoothbuilderGradeEditComponent extends BaseClass implements OnInit {
  title='ویرایش گرید';
  formGroup:any ;
  @Input() model;
  @Output() refresh:EventEmitter<boolean>;
  constructor(private boothbuildersService: BoothbuildersService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.createForm();
    this.boothbuildersService.getGradeById(this.model.Id).subscribe(res=>{
      this.formGroup.patchValue(res.data.row);
    })
  }
  createForm() {
    this.formGroup = new FormGroup({
      Id: new FormControl(this.model.Id),
      Title: new FormControl(null, Validators.required),
      LimitArea: new FormControl(null, Validators.required),
    });
  }
  save() {
    if (this.formGroup.valid === true) {
      this.boothbuildersService.editGrade(this.formGroup.value).subscribe(res => {

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
}
