import {Component, Input, OnInit} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {ArchitecturalexpertService} from "../../architecturalexpert.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-boothbuilderinfringement-create',
  templateUrl: './boothbuilderinfringement-set.component.html',
  styleUrls: ['./boothbuilderinfringement-set.component.css']
})
export class BoothbuilderinfringementSetComponent  extends BaseClass implements OnInit {
  title = 'ثبت جریمه';
  formGroup: any;
  infringmentDropDown;
  dpdown='.....';
  @Input() model;

  constructor(private architecturalexpertsService: ArchitecturalexpertService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.createForm();
    this.architecturalexpertsService.getInfringementDropDown().subscribe(res => {
      this.infringmentDropDown = res.data.rows;
    });
  }

  createForm() {
    this.formGroup = new FormGroup({
      InfringementId: new FormControl(null, Validators.required),
      BoothId: new FormControl(this.model.BoothId, Validators.required),
      Quantity: new FormControl(null, Validators.required),
    });
  }

  save() {
    if (this.formGroup.valid === true) {
      this.architecturalexpertsService.infringementCreate(this.formGroup.value).subscribe(res => {
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
  setInfringement(e) {
    this.dpdown=e.Title;
    this.formGroup.get('InfringementId').setValue(e.Id);
  }
}

