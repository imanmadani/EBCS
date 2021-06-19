import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UsersService} from "../users/users.service";
import {BaseClass} from "../../../utilities/base";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent extends  BaseClass implements OnInit {
  formGroup;

  constructor(private modalService: NgbModal,
              private componentService:UsersService,
              protected toastr: ToastrService) {
  super(toastr);
}

  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void {
    this.formGroup = new FormGroup({
      Password: new FormControl(null, Validators.required),
    });
  }

  onSubmit(repass) {
    if(this.formGroup.get('Password').value===repass.value){
      this.componentService.changePass(this.formGroup.value).subscribe(res=>{
        if(res.data.rows){
          this.success();
         this.close();
        }else {
          this.error();
        }
      });
    }else {
      this.error('تکرار رمز عبور اشتباه است');
    }
  }

  close() {
    this.modalService.dismissAll(false);
  }
}
