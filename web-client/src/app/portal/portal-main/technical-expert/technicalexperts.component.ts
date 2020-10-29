import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../utilities/base";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-technicalexpert',
  templateUrl: './technicalexperts.component.html',
  styleUrls: ['./technicalexperts.component.css']
})
export class TechnicalexpertsComponent extends BaseClass implements OnInit {

  constructor(protected toastr: ToastrService,
              readonly router:Router,
  ) {
    super(toastr);
  }
  ngOnInit(): void {
    this.router.navigate(['Dashboard/TechnicalExperts/TechnicalExpertDesk']);
  }

  activeLinkHandler() {

  }
}
