import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArchitecturalexpertService} from "../../architecturalexpert.service";

@Component({
  selector: 'app-architecturalexpert-create',
  templateUrl: './architecturalexpert-create.component.html',
  styleUrls: ['./architecturalexpert-create.component.css']
})
export class ArchitecturalexpertCreateComponent extends BaseClass implements OnInit {
  title = 'ایجاد کارشناس فنی نمایشگاه';
  formGroup: any;
  constructor(private architecturalexpertsService: ArchitecturalexpertService,
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
      GroupId: new FormControl(4)
    });
  }

  save() {
    if (this.formGroup.valid === true) {
      this.architecturalexpertsService.create(this.formGroup.value).subscribe(res => {
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

