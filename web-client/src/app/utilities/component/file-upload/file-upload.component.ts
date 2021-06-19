import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {BoothbuildersService} from "../../../portal/portal-main/booth-builders/boothbuilders.service";

const URL = 'https://design.iranfair.com/api/BoothBuilder_api.php/?api=UploadPlan';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  @Output() itemUpload = new EventEmitter();
  @Output() itemDelete = new EventEmitter();
  @Output() itemGet = new EventEmitter();
  // @Input() lastFiles;

  private _lastFiles;
  validCount = 0;

  @Input() set lastFiles(value) {
    debugger
    this._lastFiles = value;
    if (this.typeOfImage) {
      this._lastFiles.forEach(res => {
        this.typeOfImage = this.typeOfImage.filter(item => item.Id != res.Type);
      });
    }
  }

  get lastFiles(): string {
    return this._lastFiles;
    if (this.typeOfImage) {
      this._lastFiles.forEach(res => {
        this.typeOfImage = this.typeOfImage.filter(item => item.Id != res.Type);
      });
    }
  }

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  response: string;
  typeOfImageFirst;
  typeOfImage;
  temp;

  constructor(private boothbuildersService: BoothbuildersService) {
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: false,
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        debugger
        this.itemUpload.emit(item)
        this.uploader.queue = [];
      }
    });
    debugger
    this.hasBaseDropZoneOver = false;
    this.response = '';
    this.uploader.response.subscribe(res => this.response = res);
  }

  ngOnInit(): void {
    this.boothbuildersService.getBoothBuilderImageTypes().subscribe(res => {
      this.typeOfImage = res.data.rows;
      this.typeOfImageFirst = res.data.rows;
      this.validCount = this.typeOfImage.length;
      if(this.typeOfImage){
        this._lastFiles.forEach(res => {
          this.typeOfImage = this.typeOfImage.filter(item => item.Id != res.Type);
        });
      }

    })
    // this.lastFiles.forEach(res=>{
    //
    //   this.typeOfImage.filter(item=>item.Id!=res.Type);
    // });
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  deleteLastRow(Id: any) {
    this.itemDelete.emit(Id);
    this.typeOfImage = this.typeOfImageFirst;

  }

  getImage(Item: any) {
    this.itemGet.emit(Item);
  }

  changeDropDown(e, file) {
    debugger
    if(this.uploader.queue.filter(item => item.file.name == file).length>1){
      alert(' فایل تکراری است');
      this.uploader.queue.filter(item => item.file.name == file)[1].remove();
    }else {
    this.uploader.queue.filter(item => item.file.name == file)[0].formData.push({Type: e.Id, Title: e.Title});
    this.typeOfImage = this.typeOfImage.filter(item => item.Id != e.Id);
    }
  }

  uploadAll() {
    this.itemUpload.emit(this.uploader.queue);
    this.uploader.queue = [];
  }
}
