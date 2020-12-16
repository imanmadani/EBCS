import {Component, OnInit} from '@angular/core';
import {BaseClass} from '../../utilities/base';
import {LoginService} from "../../main/login/login.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-portal-main',
  templateUrl: './portal-main.component.html',
  styleUrls: ['./portal-main.component.css']
})
export class PortalMainComponent extends BaseClass implements OnInit {
  menus=[];
  data;
  versionDetail;
  userMenu = false;
  userDetail;

  constructor(private componentService: LoginService,
              private router: Router,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    debugger
    // localStorage.setItem('token', '8fea33b5e37f52b60559b73d96833888dbfd2f36');
    //  this.componentService.getUser().subscribe(res2 => {
    this.componentService.getUserByToken().subscribe(resUser=>{
      this.userDetail=resUser.data.row;
    });
    if(!localStorage.getItem('menu')){
    this.componentService.getMenu().subscribe(res3 => {
      this.data = res3.data.row;
      this.data.forEach(mnu=>{
        if(!mnu.MenuRef){
          mnu.SubMenu=[]
          this.menus.push(mnu);
        }else {
          let find=this.menus.find(e => e.Id === mnu.MenuRef);
          find.SubMenu.push(mnu);
        }
      });
      localStorage.setItem('menu',JSON.stringify(this.menus));
    });
    }else {
      this.data =JSON.parse(localStorage.getItem('menu'));
      this.data.forEach(mnu=>{
        if(!mnu.MenuRef){
          mnu.SubMenu=[]
          this.menus.push(mnu);
        }else {
          let find=this.menus.find(e => e.Id === mnu.MenuRef);
          find.SubMenu.push(mnu);
        }
      });
    }
    this.versionDetail = 'تغییرات : ایجاد منو داینامیک';
  }

  changeUserMenu() {
    this.userMenu = !this.userMenu;
  }

  activeLinkHandler() {

  }

  logout() {
    this.componentService.logout().subscribe(res=>{
      debugger
      localStorage.setItem('token', null);
      this.router.navigateByUrl('/');
    });
  }
}
