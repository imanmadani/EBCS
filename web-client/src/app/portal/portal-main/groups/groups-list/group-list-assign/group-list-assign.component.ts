import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from '../../../../../main/login/login.service';
import {GroupsService} from '../../groups.service';
import {GroupAccessModel} from '../../entity';
import {BaseClass} from '../../../../../utilities/base';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-group-list-assign',
  templateUrl: './group-list-assign.component.html',
  styleUrls: ['./group-list-assign.component.css']
})
export class GroupListAssignComponent extends BaseClass implements OnInit {
@Input() model;
  access=true;
  menus: any;
  constructor(private groupService:GroupsService  ,
              protected toastr: ToastrService) {
  super(toastr);
}

  ngOnInit(): void {
    this.groupService.getMenuWithAccess(this.model).subscribe(res=>{
      debugger
      this.menus=res.data.row;
    });
  }

  changeAccess(item) {
    debugger
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
}
