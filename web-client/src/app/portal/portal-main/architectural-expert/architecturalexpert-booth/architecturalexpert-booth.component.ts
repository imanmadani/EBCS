import { Component, OnInit } from '@angular/core';
import {ArchitecturalexpertService} from "../architecturalexpert.service";

@Component({
  selector: 'app-architecturalexpert-booth',
  templateUrl: './architecturalexpert-booth.component.html',
  styleUrls: ['./architecturalexpert-booth.component.css']
})
export class ArchitecturalexpertBoothComponent implements OnInit {
  settings = {
    columns: {
      ExhibitionName: {
        title: 'نام نمایشگاه '
      },
      HallName: {
        title: 'نام سالن'
      },
      BoothName: {
        title: 'شماره غرفه'
      },
      HallTitle: {
        title: 'سالن'
      },
      Name: {
        title: 'شماره غرفه'
      },
      AreaRial: {
        title: 'متراژ ریالی'
      },
      AreaArz: {
        title: 'متراژ ارزی'
      },
      AreaTypeTitle: {
        title: 'نوع غرفه',
      },
      Area2: {
        title: 'متراژ طبقه دوم'
      },
      HasEquipment: {
        title: 'تجهیزات',
        type:'html',
        valuePrepareFunction: (value) => {
          if (value==="1") return 'دارد';
          if (value==="2") return 'ندارد';
          return '-';
        },
      },
      BoothbuilderName: {
        title: 'غرفه ساز'
      },
      ParticipantName: {
        title: 'مشارکت کننده'
      },
      ApproveState: {
        title: 'وضعیت',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value === "1") return '<i class="fa fa-circle pr-3  text-success" title="تایید"></i>';
          if (value === "2") return '<i class="fa fa-circle pr-3  text-warning" title="عدم تایید"></i>';
          return '-';
        },
      },
    },
    actions: {
      columnTitle: 'عملیات',
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  data;
  constructor(private architecturalexpertsService:ArchitecturalexpertService) { }

  ngOnInit(): void {
    this.architecturalexpertsService.getArchitecturalExpertBooth().subscribe(res=>{
      this.data = res.data.rows;
    });
  }

}
