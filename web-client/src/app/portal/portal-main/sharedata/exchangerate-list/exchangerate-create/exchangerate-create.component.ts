import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {HalladminsService} from "../../../hall-admins/halladmins.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedataService} from "../../sharedata.service";

@Component({
  selector: 'app-exchangerate-create',
  templateUrl: './exchangerate-create.component.html',
  styleUrls: ['./exchangerate-create.component.css']
})
export class ExchangerateCreateComponent extends BaseClass implements OnInit {
  title = 'ایجاد نرخ روز';
  formGroup: any;
  constructor(private sharedataService:SharedataService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = new FormGroup({
      UnitPrice: new FormControl(null, Validators.required),
    });
  }

  save() {
    if (this.formGroup.valid === true) {
      this.sharedataService.createExchangeRate(this.formGroup.value).subscribe(res => {
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

  close() {
    this.modalService.dismissAll(false);
  }
}
