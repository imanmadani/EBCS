import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {BaseClass} from "../../../utilities/base";
import {LoginService} from "../login.service";

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent extends BaseClass implements OnInit {
  a = 0;
  b = 0;
  c = 0;
  formGroup;

  constructor(private modalService: NgbModal,
              private componentService: LoginService,
              protected toastr: ToastrService) {
  super(toastr);
}
  ngOnInit(): void {
    this.createForm();
    this.a = this.getRandomInt(0,9);
    this.b = this.getRandomInt(0,9);
    this.c = this.a + this.b;
  }

  createForm(): void {
    this.formGroup = new FormGroup({
      Username: new FormControl(null, Validators.required),
    });
  }

  close() {
    this.modalService.dismissAll(false);
  }

  onSubmit(res) {
    if(+res.value===this.c){
      this.componentService.forgetPass(this.formGroup.value).subscribe(res=>{
        if(res.data.rows===null){
          this.error('لطفا مجددا تلاش نمایید');
        }
        if(res.data.rows===false){
          this.error('نام کاربری یافت نشد');
        }
        if(res.data.rows===true){
          this.success();
        }
        this.ngOnInit();

      });

    }else {
    this.error('عبارت امنیتی اشتباه است');
     this.ngOnInit();
    }

  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
