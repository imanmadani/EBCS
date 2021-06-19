import {Component, Input, OnInit} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArchitecturalexpertService} from "../../architecturalexpert.service";

@Component({
  selector: 'app-architecturalexpert-edit',
  templateUrl: './architecturalexpert-edit.component.html',
  styleUrls: ['./architecturalexpert-edit.component.css']
})
export class ArchitecturalexpertEditComponent extends BaseClass implements OnInit {
  title='ویرایش  کارشناس فنی نمایشگاه';
  formGroup:any ;
  @Input() model;
  constructor(private architecturalexpertsService: ArchitecturalexpertService   ,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
    this.createForm();
    this.architecturalexpertsService.getById(this.model.Id).subscribe(res=>{
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
      this.architecturalexpertsService.edit(this.formGroup.value).subscribe(res => {
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
