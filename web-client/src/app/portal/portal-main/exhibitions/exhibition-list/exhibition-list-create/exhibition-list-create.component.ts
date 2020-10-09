import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseClass} from '../../../../../utilities/base';
import {ExhibitionsService} from '../../exhibitions.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-exhibition-list-create',
  templateUrl: './exhibition-list-create.component.html',
  styleUrls: ['./exhibition-list-create.component.css']
})
export class ExhibitionListCreateComponent extends BaseClass implements OnInit {
  title='ایجاد نمایشگاه';
  formGroup:any ;
  @Output() refresh:EventEmitter<boolean>;
  gradeDropDown;
  dpdown='.....';

  constructor(private exhibitionsService: ExhibitionsService   ,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
    this.createForm();
    this.exhibitionsService.ExgetGradeDropDown().subscribe(res=>{
      this.gradeDropDown=res.data.rows;
    });
  }
  createForm() {
    this.formGroup = new FormGroup({
      Title: new FormControl(null, Validators.required),
      Year: new FormControl(null, Validators.required),
      GradeId: new FormControl(null, Validators.required)
    });
  }
  save() {
    if (this.formGroup.valid === true) {
      this.exhibitionsService.Excreate(this.formGroup.value).subscribe(res => {
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

  test(e) {
   this.dpdown=e.Title;
   this.formGroup.get('GradeId').setValue(e.Id);
  }
}
