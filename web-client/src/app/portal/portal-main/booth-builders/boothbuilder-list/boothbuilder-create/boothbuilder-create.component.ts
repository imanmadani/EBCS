import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {HalladminsService} from "../../../hall-admins/halladmins.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BoothbuildersService} from "../../boothbuilders.service";

@Component({
  selector: 'app-boothbuilder-create',
  templateUrl: './boothbuilder-create.component.html',
  styleUrls: ['./boothbuilder-create.component.css']
})
export class BoothbuilderCreateComponent extends BaseClass implements OnInit {
  title = 'ایجاد پیمانکار';
  formGroup: any;
  boothBuilderGradeDropDown;
  boothBuilderGradedpdown= '.....';
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
      Mobile: new FormControl(null, Validators.required),
      Name: new FormControl(null, Validators.required),
      RegNumber: new FormControl(null, Validators.required),
      AgentName: new FormControl(null, Validators.required),
      AgentTell: new FormControl(null, Validators.required),
      GroupId: new FormControl(3),
      GradeId: new FormControl(null, Validators.required),
    });
  }

  save() {
    debugger
    if (this.formGroup.valid === true) {
      this.boothbuildersService.create(this.formGroup.value).subscribe(res => {
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

  setBoothBuilderGradeData(e){
    this.boothBuilderGradedpdown = e.Title;
    this.formGroup.get('GradeId').setValue(e.Id);
  }
}
