import {Component, Input, OnInit} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup} from "@angular/forms";
import {GroupModel} from "../../../groups/entity";
import {ExecutersService} from "../../executers.service";
import {FileUploader} from "ng2-file-upload";
const URL = 'https://design.iranfair.com/Files/Halls/';

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
  uploader: FileUploader;

  constructor(private executerService: ExecutersService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: false,
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        debugger
        this.uplaod(item)
      }
    });
  }

  ngOnInit(): void {
    this.executerService.GetUploadFileByExhibitionHallId(this.model.Id).subscribe(res=>{
      debugger
      this.data=res.data.rows;
    });
  }

  uplaod(item) {
    debugger
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

  uploadAll() {
    this.uplaod(this.uploader.queue[0]);
  }
}
