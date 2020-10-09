import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TechnicalexpertsService} from "../../technicalexperts.service";

@Component({
  selector: 'app-technicalexpert-edit',
  templateUrl: './technicalexpert-edit.component.html',
  styleUrls: ['./technicalexpert-edit.component.css']
})
export class TechnicalexpertEditComponent extends BaseClass implements OnInit {
  title='ویرایش  کارشناس فنی';
  formGroup:any ;
  @Input() model;
  constructor(private technicalexpertsService: TechnicalexpertsService   ,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
    this.createForm();
    this.technicalexpertsService.getById(this.model.Id).subscribe(res=>{
      this.formGroup.patchValue(res.data.row);
    });
  }
  createForm() {
    this.formGroup = new FormGroup({
      Id: new FormControl(this.model.Id),
      Name: new FormControl(null, Validators.required)
    });
  }
  save() {
    if (this.formGroup.valid === true) {
      this.technicalexpertsService.edit(this.formGroup.value).subscribe(res => {
          if (res.data.result) {
            this.success();
            this.modalService.dismissAll(true);

          } else {
            this.error();
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
