import {Component, Input, OnInit} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {HalladminsService} from "../../../hall-admins/halladmins.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ElectricalExpertService} from "../../electrical-expert.service";

@Component({
  selector: 'app-electricalexpert-edit',
  templateUrl: './electricalexpert-edit.component.html',
  styleUrls: ['./electricalexpert-edit.component.css']
})
export class ElectricalexpertEditComponent extends BaseClass implements OnInit {
  title='ویرایش کارشناسان برق';
  formGroup:any ;
  @Input() model;
  constructor(private electricalExpertService: ElectricalExpertService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
    this.createForm();
    this.electricalExpertService.getElectricalExpertById(this.model.Id).subscribe(res=>{
      debugger
      this.formGroup.patchValue(res.data.row);
    });
  }
  createForm() {
    this.formGroup = new FormGroup({
      UserId: new FormControl(this.model.UserId),
      Name: new FormControl(null, Validators.required)
    });
  }
  save() {
    if (this.formGroup.valid === true) {
      this.electricalExpertService.ElectricalExpertedit(this.formGroup.value).subscribe(res => {
        debugger
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
