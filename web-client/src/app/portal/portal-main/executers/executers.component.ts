import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../utilities/base";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-executer',
  templateUrl: './executers.component.html',
  styleUrls: ['./executers.component.css']
})
export class ExecutersComponent extends BaseClass implements OnInit {

  constructor(protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
  }

  activeLinkHandler() {

  }
}
