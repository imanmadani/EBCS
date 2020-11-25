import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {HalladminsService} from "../../halladmins.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-halladmin-create',
  templateUrl: './halladmin-create.component.html',
  styleUrls: ['./halladmin-create.component.css']
})
export class HalladminCreateComponent extends BaseClass implements OnInit {
  title = 'ایجاد مدیر سالن';
  formGroup: any;
  constructor(private halladminsService: HalladminsService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = new FormGroup({
      Username: new FormControl(null, Validators.required),
      Password: new FormControl(null, Validators.required),
      Name: new FormControl(null, Validators.required),
      GroupId: new FormControl(3)
    });
  }

  save() {
    if (this.formGroup.valid === true) {
      this.halladminsService.HallAdmicreate(this.formGroup.value).subscribe(res => {
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
