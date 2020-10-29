import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {RateComponent} from "../../../../utilities/component/rate/rate.component";
import {ArchitecturalexpertService} from "../architecturalexpert.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-architecturalexpert-infringements',
  templateUrl: './architecturalexpert-infringements.component.html',
  styleUrls: ['./architecturalexpert-infringements.component.css']
})
export class ArchitecturalexpertInfringementsComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      ExhibitionName: {
        title: 'نام نمایشگاه '
      },
      HallName: {
        title: 'نام سالن'
      },
      BoothName: {
        title: 'ششماره غرفه'
      },
      ParticipantName: {
        title: 'مشارکت کننده'
      },
      BuilderName: {
        title: 'پیمانکار'
      },
      Description: {
        title: 'شرح تخلف'
      },
      Quantity: {
        title: 'مقدار'
      },
      Title: {
        title: 'واحد'
      },
      Amount: {
        title: 'مبلغ'
      },
      SUMQuantity: {
        title: 'جمع'
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  data;
  constructor(private architecturalexpertsService:ArchitecturalexpertService,
              protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
    this.architecturalexpertsService.getArchitecturalexpertInfringements().subscribe(res=>{
      this.data = res.data.rows;
    });
  }
}
