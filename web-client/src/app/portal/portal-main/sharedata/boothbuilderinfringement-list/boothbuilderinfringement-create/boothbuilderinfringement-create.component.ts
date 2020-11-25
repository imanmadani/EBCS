import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {HalladminsService} from "../../../hall-admins/halladmins.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedataService} from "../../sharedata.service";

@Component({
  selector: 'app-boothbuilderinfringement-create',
  templateUrl: './boothbuilderinfringement-create.component.html',
  styleUrls: ['./boothbuilderinfringement-create.component.css']
})
export class BoothbuilderinfringementCreateComponent extends BaseClass implements OnInit {
  title = 'ایجاد تخلف پیمانکار';
  formGroup: any;
  quantityTypeDropDown;
  dpdown='.....';
  constructor(private boothBuilderInfringementService: SharedataService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.createForm();
    this.boothBuilderInfringementService.BoothBuilderInfringementQuantityTypeDropDown().subscribe(res=>{
      this.quantityTypeDropDown=res.data.rows;
    });
  }

  createForm() {
    this.formGroup = new FormGroup({
      Description: new FormControl(null, Validators.required),
      QuantityType: new FormControl(null, Validators.required),
      Amount: new FormControl(null, Validators.required),
    });
  }

  save() {
    if (this.formGroup.valid === true) {
      this.boothBuilderInfringementService.BoothBuilderInfringementcreate(this.formGroup.value).subscribe(res => {
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
    }
  }

  close() {
    this.modalService.dismissAll(false);
  }
  setquantityType(e) {
    this.dpdown=e.Title;
    this.formGroup.get('QuantityType').setValue(e.Id);
  }
}
