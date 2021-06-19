import {Component, OnInit} from '@angular/core';
import {PortalMainDashboardService} from "./portal-main-dashboard.service";
import * as moment from "jalali-moment";

@Component({
  selector: 'app-portal-main-dashbord',
  templateUrl: './portal-main-dashbord.component.html',
  styleUrls: ['./portal-main-dashbord.component.css']
})
export class PortalMainDashbordComponent implements OnInit {
  currency;
  exhibition;

  constructor(private portalMainDashboardService: PortalMainDashboardService) {
  }

  ngOnInit(): void {
    this.portalMainDashboardService.getLatestCurrency().subscribe(res => {
      let nfObject = new Intl.NumberFormat('en-US');
      let output = 'نامشخص';
      if (res.data.row) {
        output = nfObject.format(res.data.row.UnitPrice);
      }
      this.currency = output;
      this.portalMainDashboardService.getLatestExhibitions().subscribe(resEx => {
        this.exhibition = resEx.data.rows;
        if (this.exhibition) {
          for (let i = 0; i < 3; i++) {
            if (this.exhibition[i].StartDateTime !== "0000-00-00 00:00:00") {
              this.exhibition[i].StartDateTime = moment(this.exhibition[i].StartDateTime, 'YYYY/MM/DD hh:mm:ss').locale('fa').format('YYYY/MM/DD');
              this.exhibition[i].EndDateTime = moment(this.exhibition[i].EndDateTime, 'YYYY/MM/DD hh:mm:ss').locale('fa').format('YYYY/MM/DD');
            } else {
              this.exhibition[i].StartDateTime = "-";
              this.exhibition[i].EndDateTime = "-";
            }
          }
        }
      });
    });
  }

}
