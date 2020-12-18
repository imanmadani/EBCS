import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ParticipantModel} from "../entity";
import {flagDaysCalendar} from "ngx-bootstrap/datepicker/engine/flag-days-calendar";
import {ExecutersService} from "../../executers.service";
import {BaseClass} from "../../../../../utilities/base";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-executer-participant-create',
  templateUrl: './executer-participant-create.component.html',
  styleUrls: ['./executer-participant-create.component.css']
})
export class ExecuterParticipantCreateComponent extends BaseClass implements OnInit {
  name = 'This is XLSX TO JSON CONVERTER';
  willDownload = false;
  participants;
  participantObjectList;
  participantObjectListFalse;

  constructor(
    private executersService: ExecutersService,
    private modalService: NgbModal,
    protected toastr: ToastrService) {
  super(toastr);
}

ngOnInit() {

  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, {type: 'binary'});
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.participants = jsonData;
      //const dataString = JSON.stringify(jsonData);
      //document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
      //this.setDownload(dataString);
    }
    let x = reader.readAsBinaryString(file);
  }


  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }

  close() {
    this.modalService.dismissAll(false);
  }

  downloadExel() {
    window.open('http://localhost/Exhibition-sample.xlsx');
  }

  proccess() {
    this.participantsProcces(this.participants);
  }

  participantsProcces(participants) {
    this.participantObjectList = [];
    this.participantObjectListFalse = [];
    participants.Sheet1.forEach(resList => {
      let model = new ParticipantModel();
      let counter = 1;
      const key = Object.keys(resList);
      let flag = true;
      key.forEach(resObject => {
        switch (counter) {
          case 1: {
            if (resList[resObject].length < 10) {
              flag = false;
            }
            model.Username = resList[resObject].toString();
            break
          }
          case 2: {
            if (resList[resObject] === '') {
              model.CompanyName = null;
            } else {
              model.CompanyName = resList[resObject].toString();
            }
            break
          }
          case 3: {
            if (resList[resObject] === '') {
              model.CompanyAddress = null;
            } else {
              model.CompanyAddress = resList[resObject].toString();
            }
            break
          }
          case 4: {
            if (resList[resObject] === '') {
              model.ActivityField = null;
            } else {
              model.ActivityField = resList[resObject].toString();
            }
            break
          }
          case 5: {
            if (resList[resObject] === '') {
              model.Tell = null;
            } else {
              model.Tell = resList[resObject].toString();
            }
            break
          }
          case 6: {
            if (resList[resObject] === '') {
              model.Fax = null;
            } else {
              model.Fax = resList[resObject].toString();
            }
            break
          }
          case 7: {
            if (resList[resObject].length < 6) {
              flag = false;
            }
            model.EconomicCode = resList[resObject].toString();
            break
          }
          case 8: {
            if (resList[resObject] === '') {
              model.AdminName = null;
            } else {
              model.AdminName = resList[resObject].toString();
            }
            break
          }
          case 9: {
            if (resList[resObject] === '') {
              model.AdminTell = null;
            } else {
              model.AdminTell = resList[resObject].toString();
            }
            break
          }
          case 10: {
            if (resList[resObject] === '') {
              model.AgentName = null;
            } else {
              model.AgentName = resList[resObject].toString();
            }
            break
          }
          case 11: {
            if (resList[resObject].length !== 11) {
              flag = false;
            } else {
              model.AgentTell = resList[resObject].toString();
            }
            break
          }
        }
        counter++;
      });
      if (flag) {
        this.participantObjectList.push(model);
      } else {
        this.participantObjectListFalse.push(model);
      }
    });
    if (this.participantObjectList) {
      debugger
      this.executersService.participantcreate(this.participantObjectList).subscribe(res => {
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
    }
  }
}
