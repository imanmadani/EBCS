import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../utilities/base";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sharedata',
  templateUrl: './sharedata.component.html',
  styleUrls: ['./sharedata.component.css']
})
export class SharedataComponent extends BaseClass implements OnInit {

  constructor(protected toastr: ToastrService,
              readonly router:Router,
  ) {
    super(toastr);
  }
  ngOnInit(): void {
  }

  activeLinkHandler() {

  }
}
