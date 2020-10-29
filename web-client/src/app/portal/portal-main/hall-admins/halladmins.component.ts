import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../utilities/base";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-halladmin',
  templateUrl: './halladmins.component.html',
  styleUrls: ['./halladmins.component.css']
})
export class HalladminsComponent extends BaseClass implements OnInit {

  constructor(protected toastr: ToastrService,
              readonly router:Router,
  ) {
    super(toastr);
  }
  ngOnInit(): void {
    this.router.navigate(['Dashboard/HallAdmins/HallAdminDesk']);
  }

  activeLinkHandler() {

  }
}
