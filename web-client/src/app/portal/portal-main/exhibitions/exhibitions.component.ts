import { Component, OnInit } from '@angular/core';
import {BaseClass} from '../../../utilities/base';
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.css']
})
export class ExhibitionsComponent extends BaseClass implements OnInit {

  constructor(protected toastr: ToastrService,
              readonly router:Router,
  ) {
    super(toastr);
  }
  ngOnInit(): void {
    this.router.navigate(['Dashboard/Exhibitions/ExhibitionList']);
  }

  activeLinkHandler() {

  }
}
