import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseClass} from '../../../../../utilities/base';
import {ExhibitionsService} from '../../exhibitions.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'jalali-moment';

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
      GradeId: new FormControl(null, Validators.required),
      StartDateTime: new FormControl(null, Validators.required),
      EndDateTime: new FormControl(null, Validators.required),
      PlanUploadDateEnd: new FormControl(null, Validators.required)
    });
  }
  save() {
    debugger
    let shamsiStart=this.formGroup.get('StartDateTime').value;
    let miladiStart=moment.from(shamsiStart, 'fa', 'YYYY/MM/DD HH:mm');
    let shamsiEnd=this.formGroup.get('EndDateTime').value;
    let miladiEnd=moment.from(shamsiEnd, 'fa', 'YYYY/MM/DD HH:mm');
    let shamsiPlanUploadEnd=this.formGroup.get('PlanUploadDateEnd').value;
    let miladiPlanUploadEnd=moment.from(shamsiPlanUploadEnd, 'fa', 'YYYY/MM/DD HH:mm');
    miladiStart['_i']=miladiStart['_i'].replace('- ',' ')
    this.formGroup.get('StartDateTime').setValue(miladiStart['_i'])
    miladiEnd['_i']=miladiEnd['_i'].replace('- ',' ')
    this.formGroup.get('EndDateTime').setValue(miladiEnd['_i'])
    miladiPlanUploadEnd['_i']=miladiPlanUploadEnd['_i'].replace('- ',' ')
    this.formGroup.get('PlanUploadDateEnd').setValue(miladiPlanUploadEnd['_i'])
    if (this.formGroup.valid === true) {

      this.exhibitionsService.Excreate(this.formGroup.value).subscribe(res => {
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

  test(e) {
   this.dpdown=e.Title;
   this.formGroup.get('GradeId').setValue(e.Id);
  }
}
