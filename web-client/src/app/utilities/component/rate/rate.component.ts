import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements ViewCell, OnInit {

  constructor() {
  }
  renderValue:number;
  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
    debugger
    this.renderValue = this.rowData.Rate ;
  }

}
