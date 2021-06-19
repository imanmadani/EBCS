import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from '../../../../../main/login/login.service';
import {GroupsService} from '../../groups.service';
import {GroupAccessModel} from '../../entity';
import {BaseClass} from '../../../../../utilities/base';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MenuModel} from "../../../menu";

@Component({
  selector: 'app-group-list-assign',
  templateUrl: './group-list-assign.component.html',
  styleUrls: ['./group-list-assign.component.css']
})
export class GroupListAssignComponent extends BaseClass implements OnInit {
@Input() model;
  access=true;
  menus=[];
  data: any;
  constructor(private groupService:GroupsService  ,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
  super(toastr);
}

  ngOnInit(): void {
    this.groupService.getMenuWithAccess(this.model).subscribe(res=>{
      this.menus=[];
      this.data=res.data.row;
      this.data.forEach(mnu=>{
        if(!mnu.MenuRef){
          mnu.SubMenu=[]
          this.menus.push(mnu);
        }else {
          let find=this.menus.find(e => e.MenuId === mnu.MenuRef);
          find.SubMenu.push(mnu);
        }
      });
      console.log(this.data);
    });
  }

  changeAccess(item) {
    localStorage.removeItem('menu');
    let model=new GroupAccessModel();
    model.MenuId=item.MenuId;
    model.GroupId=this.model.Id;
    model.Id=item.GroupAccessId;
   if(item.GroupAccessId>0){
     this.groupService.deleteMenuAccess(model).subscribe(res=>{
       if (res.data.result) {
         this.success();
         this.ngOnInit();
       }
     });
   }else {
     this.groupService.setMenuAccess(model).subscribe(res=>{
       if (res.data.result) {
         this.success();
         this.ngOnInit();
       }
     });
   }
  }

  close(){
    this.modalService.dismissAll(false);
  }
}
