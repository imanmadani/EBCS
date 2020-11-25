import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseClass} from '../../../../../utilities/base';
import {ExhibitionsService} from '../../exhibitions.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-exhibition-hall-edit',
  templateUrl: './exhibition-hall-edit.component.html',
  styleUrls: ['./exhibition-hall-edit.component.css']
})
export class ExhibitionHallEditComponent extends BaseClass implements OnInit {
  title = 'ویرایش سالن';
  formGroup: any;
  gradeDropDown;
  dpdown = '.....';
  @Input() model;
  @Output() refresh: EventEmitter<boolean>;

  constructor(private exhibitionsService: ExhibitionsService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.createForm();
    this.exhibitionsService.HallgetGradeDropDown().subscribe(res => {
      this.gradeDropDown = res.data.rows;
      this.exhibitionsService.HallgetById(this.model.Id).subscribe(res => {
        this.formGroup.patchValue(res.data.row);
      });
    });
  }

  setGrade(e) {
    this.dpdown = e.Title;
    this.formGroup.get('GradeId').setValue(e.Id);
  }

  createForm() {
    this.formGroup = new FormGroup({
      Id: new FormControl(this.model.Id),
      Title: new FormControl(null, Validators.required),
      GradeId: new FormControl(null, Validators.required)
    });
  }

  save() {
    if (this.formGroup.valid === true) {
      this.exhibitionsService.Halledit(this.formGroup.value).subscribe(res => {
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
