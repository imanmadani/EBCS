import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {BaseClass} from "../../../utilities/base";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends BaseClass implements OnInit {
  subMenus;

  constructor(protected toastr: ToastrService,
              readonly router:Router,
  ) {
    super(toastr);
  }
  ngOnInit(): void {
    debugger
    let url = this.router.url.split('/');
    let menus = JSON.parse(localStorage.getItem('menu'));
    this.subMenus = menus.find(e => e.Link === url[2]).SubMenu;
    let defult='Dashboard/Users/'+this.subMenus[this.subMenus.length - 1].Link;
    this.router.navigate([defult]);
  }

  activeLinkHandler() {

  }
}

