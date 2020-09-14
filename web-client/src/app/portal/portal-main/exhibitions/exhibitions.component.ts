import { Component, OnInit } from '@angular/core';
import {BaseClass} from '../../../utilities/base';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.css']
})
export class ExhibitionsComponent extends BaseClass implements OnInit {

  constructor(protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
  }

  activeLinkHandler() {

  }
}
