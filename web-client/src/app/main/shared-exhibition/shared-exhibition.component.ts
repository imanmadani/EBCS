import { Component, OnInit } from '@angular/core';
import {SharedExhibitionService} from "./shared-exhibition.service";
import * as moment from "jalali-moment";
import {PortalParticipantBoothBuilderListComponent} from "../../portal/portal-participants/portal-participant-booth-builder-list/portal-participant-booth-builder-list.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SharedExhibitionHallComponent} from "./shared-exhibition-hall/shared-exhibition-hall.component";

@Component({
  selector: 'app-shared-exhibition',
  templateUrl: './shared-exhibition.component.html',
  styleUrls: ['./shared-exhibition.component.css']
})
export class SharedExhibitionComponent implements OnInit {
  exhibitions;
  booths;

  constructor(private sharedExhibitionService:SharedExhibitionService,
              private modalService: NgbModal
  ){ }

  ngOnInit(): void {
    this.sharedExhibitionService.getExhibitionActive().subscribe(res=>{

      this.exhibitions=res.data.rows;
      this.exhibitions.forEach(ex=>{
        if (ex.StartDateTime==='0000-00-00 00:00:00'){
          ex.StartDateTime="-";
        }else {
          ex.StartDateTime=moment(ex.StartDateTime, 'YYYY/MM/DD hh:mm:ss').locale('fa').format('YYYY/MM/DD');
        }
        if(ex.EndDateTime==='0000-00-00 00:00:00'){
          ex.EndDateTime="-";
        }else {
          ex.EndDateTime=moment(ex.EndDateTime, 'YYYY/MM/DD hh:mm:ss').locale('fa').format('YYYY/MM/DD');
        }
      });
    });
  }

  showBooths(Id) {
    this.sharedExhibitionService.getBoothsByHall(Id).subscribe(res=> {
      this.booths=res.data.rows;
      let modalRef = this.modalService.open(SharedExhibitionHallComponent, {centered: true,size:'xl'});
      modalRef.componentInstance.model=this.booths;
    });
  }
}
