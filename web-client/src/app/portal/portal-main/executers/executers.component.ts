import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../utilities/base";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-executer',
  templateUrl: './executers.component.html',
  styleUrls: ['./executers.component.css']
})
export class ExecutersComponent extends BaseClass implements OnInit {

  constructor(protected toastr: ToastrService,
              readonly router:Router,
  ) {
    super(toastr);
  }
  ngOnInit(): void {
    this.router.navigate(['Dashboard/Executers/BoothList']);

  }

  activeLinkHandler() {

  }
}
