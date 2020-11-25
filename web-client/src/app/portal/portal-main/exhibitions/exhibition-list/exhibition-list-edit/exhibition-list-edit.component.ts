import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseClass} from '../../../../../utilities/base';
import {ExhibitionsService} from '../../exhibitions.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-exhibition-list-edit',
  templateUrl: './exhibition-list-edit.component.html',
  styleUrls: ['./exhibition-list-edit.component.css']
})
export class ExhibitionListEditComponent extends BaseClass implements OnInit {
  title = 'ویرایش نمایشگاه';
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
    this.exhibitionsService.ExgetGradeDropDown().subscribe(res => {
      this.gradeDropDown = res.data.rows;
      this.exhibitionsService.ExgetById(this.model.Id).subscribe(res => {
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
      Year: new FormControl(null, Validators.required),
      GradeId: new FormControl(null, Validators.required)
    });
  }

  save() {
    if (this.formGroup.valid === true) {
      this.exhibitionsService.Exedit(this.formGroup.value).subscribe(res => {
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
