import { Component, OnInit } from '@angular/core';
import {GroupsService} from "../portal-main/groups/groups.service";
import {PortalParticipantsService} from "./portal-participants.service";

@Component({
  selector: 'app-portal-participants',
  templateUrl: './portal-participants.component.html',
  styleUrls: ['./portal-participants.component.css']
})
export class PortalParticipantsComponent implements OnInit {
  userInformation;
  boothBuilder;

  text:any = {
    Year: 'سال',
    Month: 'ماه',
    Days: "روز",
    Hours: "ساعت",
    Minutes: "دقیقه"
  };

  constructor(private portalParticipantsService: PortalParticipantsService) { }

  ngOnInit() {
    this.portalParticipantsService.getDataByParticipant(1).subscribe(res=>{
      this.userInformation=res.data.row;
      this.portalParticipantsService.getBoothBuilder(this.userInformation.BoothId).subscribe(resBoothBuilder=>{
        this.boothBuilder=resBoothBuilder.data.row;
        console.log(this.boothBuilder);
      });
    });
  }

  openBoothBuilders() {

  }
}
