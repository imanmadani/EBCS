import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from "ng2-smart-table";

@Component({
  selector: 'app-rate-dynamic',
  templateUrl: './rate-dynamic.component.html',
  styleUrls: ['./rate-dynamic.component.css']
})
export class RateDynamicComponent implements ViewCell, OnInit {

  constructor() {
  }

  renderValue: number;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() Result: EventEmitter<number>= new EventEmitter();

  ngOnInit() {
    this.renderValue = this.rowData.Rate;
  }

  getPoint(e) {
    this.Result.emit(e.currentTarget.ariaValueNow)
  }
}
