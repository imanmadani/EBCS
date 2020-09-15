import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseClass} from '../../../../../utilities/base';
import {ExhibitionsService} from '../../exhibitions.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-exhibition-hall-grade-edit',
  templateUrl: './exhibition-hall-grade-edit.component.html',
  styleUrls: ['./exhibition-hall-grade-edit.component.css']
})
export class ExhibitionHallGradeEditComponent extends BaseClass implements OnInit {
  title='ایجاد گروه';
  formGroup:any ;
  @Input() model;
  @Output() refresh:EventEmitter<boolean>;
  constructor(private exhibitionsService: ExhibitionsService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    debugger
    this.createForm();
    this.exhibitionsService.HallGradegetById(this.model.Id).subscribe(res=>{
      this.formGroup.patchValue(res.data.row);
    })
  }
  createForm() {
    this.formGroup = new FormGroup({
      Id: new FormControl(this.model.Id),
      Title: new FormControl(null, Validators.required),
    });
  }
  save() {
    debugger
    if (this.formGroup.valid === true) {
      this.exhibitionsService.HallGradeedit(this.formGroup.value).subscribe(res => {

          if (res.data.result) {
            this.success();
            this.modalService.dismissAll(true);
          } else {
            this.error();
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
