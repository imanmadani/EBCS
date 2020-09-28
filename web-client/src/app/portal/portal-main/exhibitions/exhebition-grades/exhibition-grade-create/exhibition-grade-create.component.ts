import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseClass} from '../../../../../utilities/base';
import {GroupsService} from '../../../groups/groups.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ExhibitionsService} from '../../exhibitions.service';

@Component({
  selector: 'app-exhibition-grade-create',
  templateUrl: './exhibition-grade-create.component.html',
  styleUrls: ['./exhibition-grade-create.component.css']
})
export class ExhibitionGradeCreateComponent extends BaseClass implements OnInit {
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
      Year: new FormControl(null, Validators.required)
    });
  }
  save() {
    if (this.formGroup.valid === true) {
      this.exhibitionsService.ExGradecreate(this.formGroup.value).subscribe(res => {
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
