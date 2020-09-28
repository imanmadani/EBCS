import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseClass} from '../../../../../utilities/base';
import {ExhibitionsService} from '../../exhibitions.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-exhibition-hall-create',
  templateUrl: './exhibition-hall-create.component.html',
  styleUrls: ['./exhibition-hall-create.component.css']
})
export class ExhibitionHallCreateComponent extends BaseClass implements OnInit {
  title='ایجاد گروه';
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
    this.exhibitionsService.HallgetGradeDropDown().subscribe(res=>{
      this.gradeDropDown=res.data.rows;
    });
  }
  createForm() {
    this.formGroup = new FormGroup({
      Title: new FormControl(null, Validators.required),
      GradeId: new FormControl(null, Validators.required)
    });
  }
  save() {
    if (this.formGroup.valid === true) {
      this.exhibitionsService.Hallcreate(this.formGroup.value).subscribe(res => {
          debugger
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
