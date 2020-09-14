import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupsService } from '../../groups.service';
import {BaseClass} from "../../../../../utilities/base";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-group-list-create',
  templateUrl: './group-list-create.component.html',
  styleUrls: ['./group-list-create.component.css']
})
export class GroupListCreateComponent extends BaseClass implements OnInit {
  title='ایجاد گروه';
  formGroup:any ;
  @Output() refresh:EventEmitter<boolean>;

  constructor(private groupsService: GroupsService   ,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
  super(toastr);
}
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.formGroup = new FormGroup({
      Name: new FormControl(null, Validators.required)
    });
  }
  save() {
      if (this.formGroup.valid === true) {
        this.groupsService.create(this.formGroup.value).subscribe(res => {
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
}
