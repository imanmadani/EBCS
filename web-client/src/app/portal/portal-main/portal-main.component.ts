import { Component, OnInit } from '@angular/core';
import {BaseClass} from '../../utilities/base';
import {findIconDefinition, library} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-portal-main',
  templateUrl: './portal-main.component.html',
  styleUrls: ['./portal-main.component.css']
})
export class PortalMainComponent extends BaseClass implements OnInit  {
  menus;
  versionDetail;
  constructor() { super()}

  ngOnInit(): void {
    this.menus=[
      {Id:1,Title:'منو1',Link:'asd',Icon:'fa fa-home'},
      {Id:1,Title:'منو2',Link:'asd',Icon:'fa fa-home'},
      {Id:1,Title:'منو3',Link:'asd',Icon:'fa fa-home'},
      {Id:1,Title:'منو4',Link:'asd',Icon:'fa fa-home'},
      {Id:1,Title:'منو5',Link:'asd',Icon:'fa fa-home'},
      {Id:1,Title:'منو6',Link:'asd',Icon:'fa fa-home'},
      {Id:1,Title:'منو7',Link:'asd',Icon:'fa fa-home'},
    ];
    this.versionDetail='تغییرات : ایجاد منو داینامیک';
  }

}
