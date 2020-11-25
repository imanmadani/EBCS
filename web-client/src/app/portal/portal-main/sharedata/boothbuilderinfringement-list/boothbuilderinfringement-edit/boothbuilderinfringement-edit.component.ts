import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedataService} from "../../sharedata.service";

@Component({
  selector: 'app-boothbuilderinfringement-edit',
  templateUrl: './boothbuilderinfringement-edit.component.html',
  styleUrls: ['./boothbuilderinfringement-edit.component.css']
})
export class BoothbuilderinfringementEditComponent extends BaseClass implements OnInit {
  title = 'ویرایش گرید';
  formGroup: any;
  @Input() model;
  @Output() refresh: EventEmitter<boolean>;

  constructor(private boothBuilderInfringementService: SharedataService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.createForm();
      this.boothBuilderInfringementService.getBoothBuilderInfringementById(this.model.Id).subscribe(res => {
        this.formGroup.patchValue(res.data.row);
      });
  }

  createForm() {
    this.formGroup = new FormGroup({
      Id: new FormControl(this.model.Id, Validators.required),
      Description: new FormControl(null, Validators.required),
    });
  }

  save() {
    if (this.formGroup.valid === true) {
      this.boothBuilderInfringementService.BoothBuilderInfringementedit(this.formGroup.value).subscribe(res => {

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
