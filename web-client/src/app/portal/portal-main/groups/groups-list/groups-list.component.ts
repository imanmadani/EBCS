import { Component, OnInit } from '@angular/core';
import {GroupsService} from "../groups.service";
import {BaseClass} from "../../../../utilities/base";

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      Name: {
        title: 'نام گروه'
      },
      FlagBlock: {
        title: 'وضعیت'
      }
    },
    actions: {
      columnTitle: 'عملیات',
      custom: [
        {
          name: 'createAction',
          title: '<i class="fa fa-plus pr-3 ebcs-font-normal text-success" title="Edit"></i>'
        },
        {
          name: 'editAction',
          title: '<i class="fa fa-edit pr-3 ebcs-font-normal text-warning" title="Edit"></i>'
        },
        {
          name: 'deleteAction',
          title: '<i class="fa fa-trash pr-3 ebcs-font-normal text-danger" title="Edit"></i>'
        },
      ],
      add: false,
      edit: false,
      delete: false,
      position: "right"
    }
  };
  data ;
  constructor(private groupsService:GroupsService) { super() }

  ngOnInit(): void {
    this.groupsService.get().subscribe(res=>{
      console.log(res);
      this.data=res.data.rows;
    })
  }

  methodHandler(e) {
    switch(e.action){
      case 'createAction' :{
        this.createHandler();
      }
    }
    console.log(e);
  }
  createHandler(){
    
  }
}
