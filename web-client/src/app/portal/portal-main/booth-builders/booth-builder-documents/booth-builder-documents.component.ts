import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import {BoothbuildersService} from "../boothbuilders.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Gallery} from "angular-gallery";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
const URLHSE = 'https://design.iranfair.com/api/BoothBuilder_api.php/?api=UploadHSE';
const URLLicense = 'https://design.iranfair.com/api/BoothBuilder_api.php/?api=UploadLicense';

@Component({
  selector: 'app-booth-builder-documents',
  templateUrl: './booth-builder-documents.component.html',
  styleUrls: ['./booth-builder-documents.component.css']
})
export class BoothBuilderDocumentsComponent extends BaseClass implements OnInit {
  formGroup:any ;
  hseFile;
  licenseFile;
  form;
  imageSrc;
  data;
  currentImage;

  @Input() model;
  @Output() refresh:EventEmitter<boolean>;
  uploaderHSE:FileUploader;
  uploaderLicense:FileUploader;
  constructor(private boothbuildersService: BoothbuildersService,
              private modalService: NgbModal,
              private gallery: Gallery,
              protected toastr: ToastrService) {
    super(toastr);
    this.uploaderHSE = new FileUploader({
      url: URLHSE,
      disableMultipart: true,
      formatDataFunctionIsAsync: true,
      formatDataFunction:  (item) => {
        this.uplaodHSE(item);
      }
    });
    this.uploaderLicense = new FileUploader({
      url: URLLicense,
      disableMultipart: true,
      formatDataFunctionIsAsync: true,
      formatDataFunction:  (item) => {
        this.uplaodLicense(item);
      }
    });
  }
  ngOnInit(): void {
    debugger
    this.boothbuildersService.getFileHSEByUser().subscribe(res=>{
      this.hseFile=res.data.row;
    });
    this.boothbuildersService.getFileLicenseByUser().subscribe(res=>{
      this.licenseFile=res.data.rows;
    });
  }
  showGallery(add,file,type) {
    let indx=0;
    let index = add + file+'.'+type;
    let prop = {
      images: [{path: index}],
      indx
    };
    this.gallery.load(prop);
  }

  uplaodHSE(item) {
    const reader = new FileReader();
    reader.readAsDataURL(item.file.rawFile);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
      this.form = new FormGroup({
        Name: new FormControl(item._file.name),
        Length: new FormControl(item._file.size),
        ContentType: new FormControl(item._file.type),
        Data: new FormControl(this.imageSrc)
      });
      this.boothbuildersService.uploadHSE(this.form.value).subscribe(res=>{
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
  uplaodLicense(item) {
    debugger
    const reader = new FileReader();
    reader.readAsDataURL(item.file.rawFile);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
      this.form = new FormGroup({
        Name: new FormControl(item._file.name),
        Length: new FormControl(item._file.size),
        ContentType: new FormControl(item._file.type),
        Data: new FormControl(this.imageSrc)
      });
      this.boothbuildersService.uploadLicense(this.form.value).subscribe(res=>{
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
}
