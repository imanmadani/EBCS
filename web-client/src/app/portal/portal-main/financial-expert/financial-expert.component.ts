import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../utilities/base";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-financial-expert',
  templateUrl: './financial-expert.component.html',
  styleUrls: ['./financial-expert.component.css']
})
export class FinancialExpertComponent extends BaseClass implements OnInit {

  constructor(protected toastr: ToastrService,
              readonly router:Router,
  ) {
    super(toastr);
  }
  ngOnInit(): void {
    this.router.navigate(['Dashboard/FinancialExperts/FinancialExpertDesk']);
  }

  activeLinkHandler() {

  }
}

