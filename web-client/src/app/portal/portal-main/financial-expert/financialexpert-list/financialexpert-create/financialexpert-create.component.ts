import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {HalladminsService} from "../../../hall-admins/halladmins.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FinancialexpertService} from "../../financialexpert.service";

@Component({
  selector: 'app-financialexpert-create',
  templateUrl: './financialexpert-create.component.html',
  styleUrls: ['./financialexpert-create.component.css']
})
export class FinancialexpertCreateComponent extends BaseClass implements OnInit {
  title = 'ایجاد کارشناس مالی';
  formGroup: any;
  constructor(private financialexpertService: FinancialexpertService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = new FormGroup({
      Name: new FormControl(null, Validators.required),
      Mobile: new FormControl(null, Validators.required),
      GroupId: new FormControl(7)
    });
  }

  save() {
    if (this.formGroup.valid === true) {
      this.financialexpertService.FinancialExpertcreate(this.formGroup.value).subscribe(res => {
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

  close() {
    this.modalService.dismissAll(false);
  }
}
