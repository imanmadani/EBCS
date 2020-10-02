import {HostListener, Component} from '@angular/core';
import {faPlus, faEdit, faTrash, faStop, faList, faKey, faUsers} from "@fortawesome/free-solid-svg-icons";
import {take} from "rxjs/operators";
import {ToastrService} from 'ngx-toastr';
@Component({
    selector: 'base-component',
    template:''
})
export class BaseClass {

  iCreate=faPlus;
  iEdit=faEdit;
  iDelete=faTrash;
  iBlock=faStop;
  iList=faList;
  iAccess=faKey;
  iUsers=faUsers;
  mobile = false;
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.innerWidth < 800) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  constructor(protected toastr: ToastrService) {
    this.onResize();
  }
  success(){
    this.toastr.success( 'انجام شد','با موفقیت',{
      timeOut: 3000,progressBar:true,easeTime:700
    }).onTap.pipe(take(1))
      .subscribe(() => this.toasterClickedHandler(this.toastr));
  }
  error(msg='مجددا تلاش نمایید'){
    this.toastr.error(msg,'خطا',{
      timeOut: 3000,progressBar:true,easeTime:700
    }).onTap.pipe(take(1))
      .subscribe(() => this.toasterClickedHandler(this.toastr));
  }

  toasterClickedHandler(toaster) {

    this.toastr.clear(toaster.index);

  }
}
