import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-shared-exhibition-hall',
  templateUrl: './shared-exhibition-hall.component.html',
  styleUrls: ['./shared-exhibition-hall.component.css']
})
export class SharedExhibitionHallComponent implements OnInit {
  @Input() model;
  settings = {
    columns: {
      CompanyName: {
        title: 'نام شرکت'
      },
      Name: {
        title: 'شماره غرفه '
      },
      ActivityField:{
        title:'فعالیت'
      },
      Tell:{
        title:'تلفن'
      },
      AdminName:{
        title:'مدیر عامل'
      },
      ComapnyAddress:{
        title:'ادرس'
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  close(){
    this.modalService.dismissAll(false);
  }
}
