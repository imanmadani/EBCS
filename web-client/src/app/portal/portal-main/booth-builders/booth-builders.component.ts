import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../utilities/base";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-booth-builders',
  templateUrl: './booth-builders.component.html',
  styleUrls: ['./booth-builders.component.css']
})
export class BoothBuildersComponent extends BaseClass implements OnInit {

  constructor(protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
  }

  activeLinkHandler() {

  }
}
