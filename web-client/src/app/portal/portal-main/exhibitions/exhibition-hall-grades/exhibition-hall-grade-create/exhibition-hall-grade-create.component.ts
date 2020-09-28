import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseClass} from '../../../../../utilities/base';
import {ExhibitionsService} from '../../exhibitions.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-exhibition-hall-grade-create',
  templateUrl: './exhibition-hall-grade-create.component.html',
  styleUrls: ['./exhibition-hall-grade-create.component.css']
})
export class ExhibitionHallGradeCreateComponent extends BaseClass implements OnInit {
  title='ایجاد گروه';
  formGroup:any ;
  @Output() refresh:EventEmitter<boolean>;

  constructor(private exhibitionsService: ExhibitionsService   ,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.formGroup = new FormGroup({
      Title: new FormControl(null, Validators.required),
    });
  }
  save() {
    debugger
    if (this.formGroup.valid === true) {
      this.exhibitionsService.HallGradecreate(this.formGroup.value).subscribe(res => {
          debugger
          if (res.data.result) {
            this.success();
            // this.refresh.emit(true);
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
