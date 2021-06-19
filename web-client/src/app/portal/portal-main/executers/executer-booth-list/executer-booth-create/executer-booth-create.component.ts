import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {ExhibitionsService} from "../../../exhibitions/exhibitions.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExecutersService} from "../../executers.service";
import {BoothbuildersService} from "../../../booth-builders/boothbuilders.service";

@Component({
  selector: 'app-exhibition-booth-create',
  templateUrl: './executer-booth-create.component.html',
  styleUrls: ['./executer-booth-create.component.css']
})
export class ExecuterBoothCreateComponent extends BaseClass implements OnInit {
  title = 'ایجاد غرفه';
  formGroup: any;
  @Output() refresh: EventEmitter<boolean>;
  exhibitionDropDown;
  dpdown = '.....';
  hallDropDown;
  halldpdown = '.....';
  participantDropDown;
  participantdpdown = '.....';
  hasEquipmentDropDown;
  hasEquipmentdpdown = '.....';
  participantDropDown2;

  constructor(private executersService: ExecutersService,
              private modalService: NgbModal,
              private boothbuildersService: BoothbuildersService,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.createForm();
      this.executersService.BoothgetExhibitionDropDown().subscribe(res => {
        this.exhibitionDropDown = res.data.rows;
        this.executersService.BoothgetParticipantDropDown().subscribe(resParticipant => {
          this.participantDropDown = resParticipant.data.rows;
          this.participantDropDown2=this.participantDropDown;
          this.boothbuildersService.BoothgetConstTypeDropDown().subscribe(resConstructionType => {
            this.hasEquipmentDropDown = resConstructionType.data.rows;
          });
        });
      });
  }

  createForm() {
    this.formGroup = new FormGroup({
      Name: new FormControl(null, Validators.required),
      ExhibitionId: new FormControl(null, Validators.required),
      ExhibitionHallId: new FormControl(null, Validators.required),
      ParticipantId: new FormControl(null, Validators.required),
      AreaRial: new FormControl(0, Validators.required),
      AreaArz: new FormControl(0, Validators.required),
      Area2: new FormControl(0),
      ConstType: new FormControl(0, Validators.required),
      // HasEquipment: new FormControl(0, Validators.required),
    });
  }

  save() {
    if (this.formGroup.valid === true) {
      this.executersService.Boothcreate(this.formGroup.value).subscribe(res => {
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

  setData(e) {
    this.dpdown = e.Title;
    this.formGroup.get('ExhibitionId').setValue(e.Id);
    this.executersService.BoothgetHallDropDown(e.Id).subscribe(res => {
      this.hallDropDown = res.data.rows;
    });
  }
  sethasEquipmentData(e){
    this.hasEquipmentdpdown=e.Title;
    this.formGroup.get('ConstType').setValue(e.Id);
  }
  setHallData(e) {
    this.halldpdown = e.Title;
    this.formGroup.get('ExhibitionHallId').setValue(e.Id);
  }

  setParticipantData(e) {
    this.participantdpdown = e.Title;
    this.formGroup.get('ParticipantId').setValue(e.Id);
  }

  searchPaticipant(query) {
    let y=this.participantDropDown.filter(x=>x.Title.indexOf(query.value)>-1);
    this.participantDropDown2=y;
  }
}
