import { Component, OnInit } from '@angular/core';
import {BaseClass} from '../../utilities/base';
import {LoginService} from "../../main/login/login.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-portal-main',
  templateUrl: './portal-main.component.html',
  styleUrls: ['./portal-main.component.css']
})
export class PortalMainComponent extends BaseClass implements OnInit  {
  menus;
  versionDetail;
  userMenu=false;

  constructor(private componentService: LoginService ,
              protected toastr: ToastrService) {
  super(toastr);
}

  ngOnInit(): void {
    localStorage.setItem('token', '8fea33b5e37f52b60559b73d96833888dbfd2f36');
    // this.componentService.getUser().subscribe(res2 => {
      this.componentService.getMenu().subscribe(res3=>{
        this.menus=res3.data.row;
      });
    //   let x = res2.rows;
    // });
    this.versionDetail='تغییرات : ایجاد منو داینامیک';
  }

  changeUserMenu() {
    this.userMenu=!this.userMenu;
  }

  activeLinkHandler() {

  }
}
