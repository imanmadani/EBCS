import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GroupsService} from '../../groups.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BaseClass} from "../../../../../utilities/base";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-group-list-edit',
  templateUrl: './group-list-edit.component.html',
  styleUrls: ['./group-list-edit.component.css']
})
export class GroupListEditComponent extends BaseClass implements OnInit {
  title='ایجاد گروه';
  formGroup:any ;
  @Input() model;
  @Output() refresh:EventEmitter<boolean>;
  constructor(private groupsService: GroupsService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
  super(toastr);
}

  ngOnInit(): void {
    this.createForm();
    this.groupsService.getById(this.model.Id).subscribe(res=>{
      this.formGroup.patchValue(res.data.row);
    })
  }
  createForm() {
    this.formGroup = new FormGroup({
      Id: new FormControl(),
      Name: new FormControl(null, Validators.required)
    });
  }
  save() {
    if (this.formGroup.valid === true) {
      this.groupsService.edit(this.formGroup.value).subscribe(res => {

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
}
