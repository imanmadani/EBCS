import {Component, Input, OnInit} from '@angular/core';
import {UploadModel} from "../../../../../utilities/component/file-upload/uploadModel";
import {BoothbuildersService} from "../../boothbuilders.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BaseClass} from "../../../../../utilities/base";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-boothbuilder-plan-upload',
  templateUrl: './boothbuilder-plan-upload.component.html',
  styleUrls: ['./boothbuilder-plan-upload.component.css']
})
export class BoothbuilderPlanUploadComponent extends BaseClass implements OnInit {
  form;
  imageSrc;
  @Input() model;

  constructor(private boothBuilderService: BoothbuildersService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
  super(toastr);
}

  ngOnInit(): void {
  }

  uplaod(item) {
    debugger
    // let model = new UploadModel();
    // model.name = item._file.name;
    // model.length = item._file.size;
    // model.contentType = item._file.type;
    // model.date = new Date();
    // model.data =item.file;
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
      this.boothBuilderService.uploadPlan(this.form.value).subscribe(res=>{
          if (res.data.result) {
            this.success();
          } else {
            this.error();
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
}
