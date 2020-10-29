import {Component, Input, OnInit} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FinancialexpertService} from "../../financialexpert.service";

@Component({
  selector: 'app-financialexpert-edit',
  templateUrl: './financialexpert-edit.component.html',
  styleUrls: ['./financialexpert-edit.component.css']
})
export class FinancialexpertEditComponent extends BaseClass implements OnInit {
  title='ویرایش مدیر سالن';
  formGroup:any ;
  @Input() model;
  constructor(private financialexpertsService: FinancialexpertService   ,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
    this.createForm();
    this.financialexpertsService.getFinancialExpertById(this.model.Id).subscribe(res=>{
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
      this.financialexpertsService.FinancialExpertedit(this.formGroup.value).subscribe(res => {
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
