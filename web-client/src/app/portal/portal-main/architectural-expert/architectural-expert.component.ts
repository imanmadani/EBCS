import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../utilities/base";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-architectural-expert',
  templateUrl: './architectural-expert.component.html',
  styleUrls: ['./architectural-expert.component.css']
})
export class ArchitecturalExpertComponent  extends BaseClass implements OnInit {

  constructor(protected toastr: ToastrService,
              readonly router:Router,
  ) {
    super(toastr);
  }
  ngOnInit(): void {
    this.router.navigate(['Dashboard/ArchitecturalExperts/ArchitecturalExpertDesk']);
  }

  activeLinkHandler() {

  }
}
