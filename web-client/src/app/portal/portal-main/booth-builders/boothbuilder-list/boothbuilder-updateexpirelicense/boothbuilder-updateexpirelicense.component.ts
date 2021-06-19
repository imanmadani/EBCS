import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {BoothbuildersService} from "../../boothbuilders.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from "jalali-moment";

@Component({
  selector: 'app-boothbuilder-updateexpirelicense',
  templateUrl: './boothbuilder-updateexpirelicense.component.html',
  styleUrls: ['./boothbuilder-updateexpirelicense.component.css']
})
export class BoothbuilderUpdateexpirelicenseComponent  extends BaseClass implements OnInit {
  title='تمدید اعتبار';
  formGroup:any ;
  @Input() model;
  @Output() refresh:EventEmitter<boolean>;
  constructor(private boothbuildersService: BoothbuildersService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.formGroup = new FormGroup({
      Id: new FormControl(this.model.Id),
      LicenseExpire: new FormControl(null, Validators.required),
    });
  }
  save() {
    debugger;
    let shamsi=this.formGroup.get('LicenseExpire').value;
    let miladi=moment.from(shamsi, 'fa', 'YYYY/MM/DD');
    this.formGroup.get('LicenseExpire').setValue(miladi['_i'])
    if (this.formGroup.valid === true) {
      this.boothbuildersService.editLicenseExpire(this.formGroup.value).subscribe(res => {
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
