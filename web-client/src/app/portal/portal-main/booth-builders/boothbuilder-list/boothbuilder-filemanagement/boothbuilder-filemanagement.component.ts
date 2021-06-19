import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BoothbuildersService} from "../../boothbuilders.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {baseConfig} from "ngx-bootstrap/chronos/locale/locale.defaults";
import {BaseClass} from "../../../../../utilities/base";
import {Gallery} from "angular-gallery";

@Component({
  selector: 'app-boothbuilder-filemanagement',
  templateUrl: './boothbuilder-filemanagement.component.html',
  styleUrls: ['./boothbuilder-filemanagement.component.css']
})
export class BoothbuilderFilemanagementComponent extends BaseClass implements OnInit {
  title='مدارک';
  formGroup:any ;
  hseFile;
  licenseFile;
  @Input() model;
  @Output() refresh:EventEmitter<boolean>;
  constructor(private boothbuildersService: BoothbuildersService,
              private modalService: NgbModal,
              private gallery: Gallery,
              protected toastr: ToastrService) {
    super(toastr);
  }
  ngOnInit(): void {
    this.boothbuildersService.getFileHSE(this.model.Id).subscribe(res=>{
      this.hseFile=res.data.row;
    });
    this.boothbuildersService.getFileLicense(this.model.Id).subscribe(res=>{
      this.licenseFile=res.data.rows;
    });
  }
  showGallery(add,file,type) {
    debugger
    let indx=0;
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
}
