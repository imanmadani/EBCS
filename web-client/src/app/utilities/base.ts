import { FormControl, FormGroup } from '@angular/forms';
import {HostListener, Component} from '@angular/core';
import {faPlus, faEdit, faTrash, faStop, faList, faKey} from "@fortawesome/free-solid-svg-icons";
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
  mobile = false;
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.innerWidth < 800) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }
  constructor() {
    this.onResize();
  }
}
