import {Component, Input, OnInit} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BoothbuildersService} from "../../boothbuilders.service";

@Component({
  selector: 'app-boothbuilder-changeboothtype',
  templateUrl: './boothbuilder-changeboothtype.component.html',
  styleUrls: ['./boothbuilder-changeboothtype.component.css']
})
export class BoothbuilderChangeboothtypeComponent extends BaseClass implements OnInit {
  title = ' تعیین نوع ساخت';
  formGroup: any;
  constTypedpdown = '.....';
  constTypeDropDown;
  boothByIdModel;
  @Input() model;

  constructor(private boothbuildersService: BoothbuildersService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit() {
    this.createForm();
    debugger
    this.boothbuildersService.BoothgetConstTypeDropDown().subscribe(resConstructionType => {
      this.constTypeDropDown = resConstructionType.data.rows;
      this.boothbuildersService.getBoothById(this.model.BoothId).subscribe(res => {
        debugger
        this.formGroup.patchValue(res.data.row);
        this.boothByIdModel=res.data.row;
        this.constTypedpdown = this.constTypeDropDown[this.boothByIdModel.ConstructionType-1].Title;
        this.formGroup.get('ConstructionType').setValue(this.boothByIdModel.ConstructionType);
      });
    });
  }

  createForm() {
    this.formGroup = new FormGroup({
      Id: new FormControl(this.model.Id),
      ConstructionType: new FormControl(null, Validators.required)
    });
  }

  setConstTypeData(e) {
    this.constTypedpdown = e.Title;
    this.formGroup.get('ConstructionType').setValue(e.Id);
  }

  save() {
    if (this.formGroup.valid === true) {
      this.boothbuildersService.editConstType(this.formGroup.value).subscribe(res => {
          if (res.data.result) {
            this.success();
            this.modalService.dismissAll(true);

          } else {
            this.error(res.message);
          }
        },
        (err) => {
          this.error(err.error);
        });
    } else {
      // this.validateAllFormFields(this.formGroup);
    }
  }

  close() {
    this.modalService.dismissAll(false);
  }
}
