import {Component, OnInit} from '@angular/core';
import {BaseClass} from '../../../utilities/base';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.css']
})
export class ExhibitionsComponent extends BaseClass implements OnInit {
  subMenus;

  constructor(protected toastr: ToastrService,
              readonly router: Router
  ) {
    super(toastr);
  }

  ngOnInit(): void {
    debugger
    let url = this.router.url.split('/');
    let menus = JSON.parse(localStorage.getItem('menu'));
    console.log(menus);
    this.subMenus = menus.find(e => e.Link === url[2]);
    console.log(this.subMenus);
    // this.router.navigate(['Dashboard/Exhibitions/ExhibitionList']);
  }

  activeLinkHandler() {

  }
}
