import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {ExhibitionsService} from "../../exhibitions.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-exhibition-booth-create',
  templateUrl: './exhibition-booth-create.component.html',
  styleUrls: ['./exhibition-booth-create.component.css']
})
export class ExhibitionBoothCreateComponent extends BaseClass implements OnInit {
  title='ایجاد غرفه';
  formGroup:any ;
  @Output() refresh:EventEmitter<boolean>;
  exhibitionDropDown;
  dpdown='.....';
  hallDropDown;
  halldpdown='.....';
  participantDropDown;
  participantdpdown='.....';

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
      Name: new FormControl(null, Validators.required),
      ExhibitionId: new FormControl(null, Validators.required),
      HallId: new FormControl(null, Validators.required),
      ParticipantId: new FormControl(null, Validators.required),
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
  setParticipantData(e) {
    this.halldpdown=e.Title;
    this.formGroup.get('GradeId').setValue(e.Id);
  }
}
