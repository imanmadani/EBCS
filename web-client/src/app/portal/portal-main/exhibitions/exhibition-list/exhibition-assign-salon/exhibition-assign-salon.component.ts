import {Component, Input, OnInit} from '@angular/core';
import {DuallistComponent} from '../../../../../utilities/component/duallist/duallist.component';
import {ExhibitionsService} from '../../exhibitions.service';
import {ToastrService} from 'ngx-toastr';
import {BaseClass} from '../../../../../utilities/base';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-exhibition-assign-salon',
  templateUrl: './exhibition-assign-salon.component.html',
  styleUrls: ['./exhibition-assign-salon.component.css']
})
export class ExhibitionAssignSalonComponent extends BaseClass implements OnInit {
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
  title='افزودن سالن';
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
      this.initializeDuallist();
    });
  }

  initializeDuallist() {
    this.confirmedSource = new Array<any>();
    this.exhibitionsService.getByExhibitionId(this.model.Id).subscribe(res=>{
      res.data.rows.forEach((obj) => {
        debugger
        const index = this.source.findIndex(e => e.Id == obj.HallId);
        if(index>-1)
          this.confirmedSource.push(this.source[index]);
      });
      this.configDuallist();
    });
  }

  private configDuallist() {
    this.key = 'Id';
    this.display = 'Title'; // [ 'station', 'state' ];
    this.keepSorted = true;
    // this.source = this.source;
    this.confirmed = this.confirmedSource;
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
