import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExecutersService} from "../../../executers/executers.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FinancialexpertService} from "../../financialexpert.service";
import {BaseClass} from "../../../../../utilities/base";
import {FileUploader} from "ng2-file-upload";


@Component({
  selector: 'app-bill-create',
  templateUrl: './bill-create.component.html',
  styleUrls: ['./bill-create.component.css']
})
export class BillCreateComponent extends BaseClass implements OnInit {
  title = 'ویرایش غرفه';
  formGroup;
  exhibitionDropDown;
  dpdown = '.....';
  hallDropDown;
  halldpdown = '.....';
  boothDropDown;
  boothdpdown = '.....';
  uploaderfile: FileUploader;
  filesObject;
  constructor(private financialexpertService: FinancialexpertService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
    this.uploaderfile = new FileUploader({
      disableMultipart: true,
      formatDataFunctionIsAsync: true,
      formatDataFunction: (item) => {
        this.filesObject=item;
        //this.uplaodFiles(item);
      }
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.financialexpertService.getExhibitionDropDown().subscribe(res => {
      this.exhibitionDropDown = res.data.rows;
    });
  }

  createForm() {
    this.formGroup = new FormGroup({
      BoothId: new FormControl(null, Validators.required),
      Quantity: new FormControl(null, Validators.required),
      Amount: new FormControl(null, Validators.required),
      Name: new FormControl(null, Validators.required),
      Length: new FormControl(null, Validators.required),
      ContentType: new FormControl(null, Validators.required),
      Data: new FormControl(null, Validators.required),
    });
  }


  save() {
    this.uploaderfile.uploadAll();
    const reader = new FileReader();
    reader.readAsDataURL(this.filesObject.file.rawFile);
    reader.onload = () => {
      let imageSrc = reader.result as string;
      this.formGroup.get('Name').setValue(this.filesObject._file.name);
      this.formGroup.get('Length').setValue(this.filesObject._file.size);
      this.formGroup.get('ContentType').setValue(this.filesObject._file.type);
      this.formGroup.get('Data').setValue(imageSrc);
      if (this.formGroup.valid === true) {
        this.financialexpertService.FinancialExpertCreateBill(this.formGroup.value).subscribe(res => {
            if (res.data.result) {
              this.success();
              this.close();
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
    };
  }

  close() {
    this.modalService.dismissAll(false);
  }

  setHallData(e) {
    this.dpdown = e.Title;
    this.financialexpertService.getHallDropDown(e.Id).subscribe(res => {
      this.hallDropDown = res.data.rows;
      this.halldpdown = '';
    });
  }

  setBoothData(e) {
    this.halldpdown = e.Title;
    this.financialexpertService.getBoothsDropDown(e.Id).subscribe(res => {
      this.boothDropDown = res.data.rows;
      this.boothdpdown = '';
    });
  }

  setBooth(e) {
    this.boothdpdown = e.Title;
    this.formGroup.get('BoothId').setValue(e.Id);

  }
}
