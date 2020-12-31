import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HeadquarterService} from "../../headquarter.service";

@Component({
  selector: 'app-headquarter-create',
  templateUrl: './headquarter-create.component.html',
  styleUrls: ['./headquarter-create.component.css']
})
export class HeadquarterCreateComponent extends BaseClass implements OnInit {
  title = 'ایجاد ستاد نمایشگاه';
  formGroup: any;
  constructor(private headquarterService: HeadquarterService,
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
      GroupId: new FormControl(8)
    });
  }

  save() {
    if (this.formGroup.valid === true) {
      this.headquarterService.HeadQuartercreate(this.formGroup.value).subscribe(res => {
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
