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
  constructor(private technicalexpertsService: TechnicalexpertsService,
              private gallery: Gallery,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }


  ngOnInit(): void {
    debugger
    this.technicalexpertsService.getPlanByBoothBoothbuilderId(this.model.BoothBoothBuilderId).subscribe(res=>{
      this.files=res.data.rows;
    });
  }

  showGallery(index: number) {
    let prop = {
      images: [{path: 'http://localhost/Files/Plans/5f92db446cc4e.jpeg'}],
      index
    };
    this.gallery.load(prop);
  }

  close() {
    this.modalService.dismissAll(false);
  }
}
