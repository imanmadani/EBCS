import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseClass} from '../../../../../utilities/base';
import {GroupsService} from '../../../groups/groups.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ExhibitionsService} from '../../exhibitions.service';

@Component({
  selector: 'app-exhibition-grade-edit',
  templateUrl: './exhibition-grade-edit.component.html',
  styleUrls: ['./exhibition-grade-edit.component.css']
})
export class ExhibitionGradeEditComponent extends BaseClass implements OnInit {
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
    this.exhibitionsService.getById(this.model.Id).subscribe(res=>{
      this.formGroup.patchValue(res.data.row);
    })
  }
  createForm() {
    this.formGroup = new FormGroup({
      Id: new FormControl(this.model.Id),
      Title: new FormControl(null, Validators.required),
      Year: new FormControl(null, Validators.required)
    });
  }
  save() {
    debugger
    if (this.formGroup.valid === true) {
      this.exhibitionsService.edit(this.formGroup.value).subscribe(res => {

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
