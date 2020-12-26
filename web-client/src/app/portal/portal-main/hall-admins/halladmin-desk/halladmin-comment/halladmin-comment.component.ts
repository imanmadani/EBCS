import {Component, Input, OnInit} from '@angular/core';
import {HalladminsService} from "../../halladmins.service";
import * as moment from "jalali-moment";
import {BaseClass} from "../../../../../utilities/base";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HalladmincommentService} from "./halladmincomment.service";

@Component({
  selector: 'app-halladmin-comment',
  templateUrl: './halladmin-comment.component.html',
  styleUrls: ['./halladmin-comment.component.css']
})
export class HalladminCommentComponent extends BaseClass  implements OnInit {
  @Input() model;
  commentValue;
  comments;

  constructor(private halladmincommentService: HalladmincommentService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    debugger
    this.halladmincommentService.getCommentsByBoothId(this.model).subscribe(res => {
      this.comments = res.data.rows;
      if(this.comments.length>0) {
        this.comments.forEach(com => {
          if (com.DateTime === '0000-00-00 00:00:00') {
            com.DateTime = "-";
          } else {
            com.DateTime = moment(com.DateTime, 'YYYY/MM/DD hh:mm:ss').locale('fa').format('hh:mm:ss YYYY/MM/DD');

          }
        });
      }
    });
  }
  refreshComment(){
    this.ngOnInit();
  }

  setComment() {
    let model = {BoothId: this.model.BoothId, HallAdminId: this.model.HallAdminId, Description: this.commentValue};
    this.halladmincommentService.setCommentsByBoothId(model).subscribe(res => {
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

  close() {
    this.modalService.dismissAll(false);
  }

}
