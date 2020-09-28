import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {ExhibitionsService} from "../../exhibitions.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-exhibition-booth-edit',
  templateUrl: './exhibition-booth-edit.component.html',
  styleUrls: ['./exhibition-booth-edit.component.css']
})
export class ExhibitionBoothEditComponent extends BaseClass implements OnInit {
  title='ایجاد غرفه';
  formGroup:any ;
  @Output() refresh:EventEmitter<boolean>;
  exhibitionDropDown;
  dpdown='.....';
  hallDropDown;
  halldpdown='.....';

  constructor(private exhibitionsService: ExhibitionsService   ,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
    this.createForm();
    this.exhibitionsService.BoothgetExhibitionDropDown().subscribe(res=>{
      this.exhibitionDropDown=res.data.rows;
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

  setData(e) {
    this.dpdown=e.Title;
    this.formGroup.get('GradeId').setValue(e.Id);
    debugger
    this.exhibitionsService.BoothgetHallDropDown(e.Id).subscribe(res=>{
      this.hallDropDown=res.data.rows;
      this.halldpdown='';
      this.formGroup.get('GradeId').setValue(null);
    });
  }
  setHallData(e) {
    this.halldpdown=e.Title;
    this.formGroup.get('GradeId').setValue(e.Id);
  }
}
