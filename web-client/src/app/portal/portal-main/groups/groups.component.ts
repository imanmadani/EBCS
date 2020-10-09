import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../utilities/base";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent extends BaseClass implements OnInit {
  activeMenu;

  constructor(readonly router: Router ,
              protected toastr: ToastrService) {
  super(toastr);
}
  ngOnInit(): void {
    this.router.navigateByUrl('/GroupsList');
  }

  activeLinkHandler() {

  }
}
