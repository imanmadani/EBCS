import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../utilities/base";
import {Router} from "@angular/router";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent extends BaseClass implements OnInit {
  activeMenu;

  constructor(private router: Router) { super() }

  ngOnInit(): void {
  }

  activeLinkHandler() {

  }
}
