import { FormControl, FormGroup } from '@angular/forms';
import {HostListener, Component} from '@angular/core';
@Component({
    selector: 'base-component',
    template:''
})
export class BaseClass {
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
