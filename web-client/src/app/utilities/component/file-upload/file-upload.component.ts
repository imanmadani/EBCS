import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost/api/BoothBuilder_api.php/?api=UploadPlan';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent{
  @Output() itemUpload = new EventEmitter();
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  response:string;

  constructor (){
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true,
      formatDataFunctionIsAsync: true,
      formatDataFunction:  (item) => {
        this.itemUpload.emit(item)
      }
    });
    this.hasBaseDropZoneOver = false;
    this.response = '';
    this.uploader.response.subscribe( res => this.response = res );
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

}
