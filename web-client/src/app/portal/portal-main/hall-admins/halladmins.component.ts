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
  subMenus;

  constructor(protected toastr: ToastrService,
              readonly router:Router,
  ) {
    super(toastr);
  }
  ngOnInit(): void {
    let url = this.router.url.split('/');
    let menus = JSON.parse(localStorage.getItem('menu'));
    this.subMenus = menus.find(e => e.Link === url[2]).SubMenu;
    let defult='Dashboard/HallAdmins/'+this.subMenus[this.subMenus.length - 1].Link;
    this.router.navigate([defult]);
  }

  activeLinkHandler() {

  }
}
