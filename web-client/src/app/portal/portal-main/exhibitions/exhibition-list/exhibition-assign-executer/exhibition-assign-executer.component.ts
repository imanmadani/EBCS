import {Component, Input, OnInit} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {DuallistComponent} from "../../../../../utilities/component/duallist/duallist.component";
import {ExhibitionsService} from "../../exhibitions.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-exhibition-assign-executer',
  templateUrl: './exhibition-assign-executer.component.html',
  styleUrls: ['./exhibition-assign-executer.component.css']
})
export class ExhibitionAssignExecuterComponent extends BaseClass implements OnInit {
  keepSorted = true;
  key: string;
  display: string;
  filter = false;
  source: Array<any>;
  confirmed: Array<any>;
  userAdd = '';
  disabled = false;
  sourceLeft = true;
  format: any = DuallistComponent.DEFAULT_FORMAT;


  private confirmedSource: Array<any>;
  title='افزودن مجریان';
  @Input() model;
  constructor(
    private exhibitionsService: ExhibitionsService,
    private modalService: NgbModal,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit() {
    this.exhibitionsService.Hallget().subscribe(res => {
      this.source = res.data.rows;
    });
  }

  save() {
    debugger
    this.exhibitionsService.ExAssignHall(this.confirmedSource,this.model.Id).subscribe(res => {
        debugger
        if (res.data.result) {
          this.success();
          this.modalService.dismissAll(true);
        } else {
          this.error();
        }
      },
      (err) => {
        this.error(err.error);
      });

  }
  close() {

  }


}
