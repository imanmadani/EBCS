import {Component, Input, OnInit} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {ElectricalExpertService} from "../../../electrical-expert/electrical-expert.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HeadquarterService} from "../../headquarter.service";

@Component({
  selector: 'app-headquarter-edit',
  templateUrl: './headquarter-edit.component.html',
  styleUrls: ['./headquarter-edit.component.css']
})
export class HeadquarterEditComponent extends BaseClass implements OnInit {
  title='ویرایش ستاد نمایشگاهی';
  formGroup:any ;
  @Input() model;
  constructor(private headquarterService: HeadquarterService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
    this.createForm();
    this.headquarterService.getHeadQuarterById(this.model.Id).subscribe(res=>{
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
      this.headquarterService.HeadQuarteredit(this.formGroup.value).subscribe(res => {
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
