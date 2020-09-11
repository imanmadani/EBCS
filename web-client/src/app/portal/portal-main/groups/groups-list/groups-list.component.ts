import { Component, OnInit } from '@angular/core';
import {GroupsService} from "../groups.service";

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      }
    }
  };
  constructor(private groupsService:GroupsService) { }

  ngOnInit(): void {
    this.groupsService.get().subscribe(res=>{
      console.log(res);
    })
  }

}
