import {Component, Input, OnInit} from '@angular/core';
import {UploadModel} from "../../../../../utilities/component/file-upload/uploadModel";
import {BoothbuildersService} from "../../boothbuilders.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BaseClass} from "../../../../../utilities/base";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GroupModel} from "../../../groups/entity";

@Component({
  selector: 'app-boothbuilder-plan-upload',
  templateUrl: './boothbuilder-plan-upload.component.html',
  styleUrls: ['./boothbuilder-plan-upload.component.css']
})
export class BoothbuilderPlanUploadComponent extends BaseClass implements OnInit {
  form;
  imageSrc;
  data;
  currentImage;
  comments
  @Input() model;

  constructor(private boothBuilderService: BoothbuildersService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
  super(toastr);
}

  ngOnInit(): void {
   this.boothBuilderService.GetUploadFileByBoothBoothbuilderId(this.model.Id).subscribe(res=>{
       this.data=res.data.rows;
   });
  }

  uplaod(items) {
    items.forEach(item=>{
      const reader = new FileReader();
      reader.readAsDataURL(item.file.rawFile);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form = new FormGroup({
          Id: new FormControl(this.model.Id,Validators.required),
          Name: new FormControl(item._file.name,Validators.required),
          Length: new FormControl(item._file.size,Validators.required),
          ContentType: new FormControl(item._file.type,Validators.required),
          Date: new FormControl(new Date(),Validators.required),
          Data: new FormControl(this.imageSrc,Validators.required),
          Type:new FormControl(item.formData[0].Type,Validators.required)
        });
        this.boothBuilderService.uploadPlan(this.form.value).subscribe(res=>{
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
      };
    });
  }
  close(){
    this.modalService.dismissAll(false);
  }

  deletePlan($event) {
    let entity = new GroupModel();
    entity.Id = +$event;
    this.boothBuilderService.deletePlan(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }
  getImage($event) {
    debugger
    this.currentImage=$event;
    this.boothBuilderService.getPlanCommentsByboothboothbuilderplan(this.currentImage.PlanId).subscribe(res=>{
      debugger
      this.comments=res.data.rows;
    });
  }
}
