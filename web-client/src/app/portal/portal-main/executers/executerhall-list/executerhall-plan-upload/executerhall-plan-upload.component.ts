import {Component, Input, OnInit} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {BoothbuildersService} from "../../../booth-builders/boothbuilders.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup} from "@angular/forms";
import {GroupModel} from "../../../groups/entity";
import {ExecutersService} from "../../executers.service";

@Component({
  selector: 'app-executerhall-plan-upload',
  templateUrl: './executerhall-plan-upload.component.html',
  styleUrls: ['./executerhall-plan-upload.component.css']
})
export class ExecuterhallPlanUploadComponent extends BaseClass implements OnInit {
  form;
  imageSrc;
  data;
  @Input() model;
  currentImage;

  constructor(private executerService: ExecutersService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.executerService.GetUploadFileByExhibitionHallId(this.model.Id).subscribe(res=>{
      this.data=res.data.rows;
    });
  }

  uplaod(item) {
    const reader = new FileReader();
    reader.readAsDataURL(item.file.rawFile);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
      this.form = new FormGroup({
        Id: new FormControl(this.model.Id),
        Name: new FormControl(item._file.name),
        Length: new FormControl(item._file.size),
        ContentType: new FormControl(item._file.type),
        Date: new FormControl(new Date()),
        Data: new FormControl(this.imageSrc)
      });
      this.executerService.uploadPlan(this.form.value).subscribe(res=>{
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
  }
  close(){
    this.modalService.dismissAll(false);
  }

  deletePlan($event) {
    let entity = new GroupModel();
    entity.Id = +$event;
    this.executerService.deletePlan(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }

  getImage($event) {
    this.currentImage=$event;
    console.log(this.currentImage);
  }
}
