import {Component, Input, OnInit} from '@angular/core';
import {Gallery} from "angular-gallery";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {BaseClass} from "../../../../../utilities/base";
import {TechnicalexpertsService} from "../../technicalexperts.service";
import {TechnicalExpertModel} from "../../entity";

@Component({
  selector: 'app-technicalexpert-filemanagement',
  templateUrl: './technicalexpert-filemanagement.component.html',
  styleUrls: ['./technicalexpert-filemanagement.component.css']
})
export class TechnicalexpertFilemanagementComponent extends BaseClass implements OnInit {
  title = 'تصاویر پلان ها';
  @Input() model;
  files;
  comments;
  txt;
  boothBuilderTasks;
  hallmode=false;

  constructor(private technicalexpertsService: TechnicalexpertsService,
              private gallery: Gallery,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }


  ngOnInit(): void {
    if(this.model.halladmin===1){
      this.hallmode=true;
    }
    this.technicalexpertsService.getPlanByBoothBoothbuilderId(this.model.BoothBoothBuilderId).subscribe(res => {
      this.technicalexpertsService.getPlanCommentsByBoothBoothBuilderId(this.model.BoothBoothBuilderId).subscribe(resComment => {
        this.comments = resComment.data.rows;
        // this.technicalexpertsService.getBoothBuilderTaskByBoothBuilder(this.model.BoothBuilderId).subscribe(res3=>{
        //   this.boothBuilderTasks=res3.data.rows;
        // });
      });
      this.files = res.data.rows;
    });

  }

  showGallery(add,file,type) {
    let indx=0;
    if(type=='jpeg'){
      type='jpg';
    }
    let index = add + file+'.'+type;
    let prop = {
      images: [{path: index}],
      indx
    };
    this.gallery.load(prop);
  }

  close() {
    this.modalService.dismissAll(false);
  }

  setComment(boothboothbuilderplanId) {
    debugger
    // @ts-ignore
    const input = document.getElementById(boothboothbuilderplanId).value;
    let model = {
      BoothBoothbuilderId: this.model.BoothBoothBuilderId,
      BoothBoothbuilderplanId: boothboothbuilderplanId,
      Text: input
    }
    this.technicalexpertsService.createPlanComment(model).subscribe(res => {
      debugger
        if (res.data.result) {
          this.success();
          this.ngOnInit();
        } else {
          this.error(res.message);
        }
      },
      (err) => {
        this.error(err.error);
      });
  }

  approvePlan(BoothBoothbuilderplanId) {
    let model = {Id: BoothBoothbuilderplanId, State: 1}
    this.technicalexpertsService.editPlanApprove(model).subscribe(res => {
        if (res.data.result) {
          this.success();
          this.ngOnInit();
        } else {
          this.error(res.message);
        }
      },
      (err) => {
        this.error(err.error);
      });
  }
}
