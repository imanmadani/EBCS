import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseClass} from "../../../../../utilities/base";
import {DuallistComponent} from "../../../../../utilities/component/duallist/duallist.component";
import {ExhibitionsService} from "../../exhibitions.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupModel} from "../../../groups/entity";

@Component({
  selector: 'app-exhibition-assign-executer',
  templateUrl: './exhibition-assign-executer.component.html',
  styleUrls: ['./exhibition-assign-executer.component.css']
})
export class ExhibitionAssignExecuterComponent extends BaseClass implements OnInit {
  title='افزودن مجریان';
  formGroup:any ;
  @Output() refresh:EventEmitter<boolean>;
  executerDropDown;
  dpdown='.....';
  @Input() model;

  settings = {
    columns: {
      Name: {
        title: 'نام مجری'
      },
    },
    actions: {
      columnTitle: 'عملیات',
      width: '300px',
      custom: [
        {
          name: 'deleteAction',
          title: '<i class="fa fa-trash pr-3 ebcs-font-normal text-danger" title="حذف"></i>'
        }
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  data;
  executerDropDown2;
  constructor(
    private exhibitionsService: ExhibitionsService,
    private modalService: NgbModal,
    protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.createForm();
    this.exhibitionsService.ExgetExecuterDropDown().subscribe(res=>{
      this.executerDropDown=res.data.rows;
      this.exhibitionsService.ExgetExecuterByExhibitionId(this.model.Id).subscribe(resExecuterList=>{
        this.data=resExecuterList.data.rows;
      });
    });
  }
  createForm() {
    this.formGroup = new FormGroup({
      ExhibitionId: new FormControl(this.model.Id),
      ExecuterId: new FormControl(null, Validators.required)
    });
  }
  methodHandler(e) {
    switch (e.action) {
      case 'deleteAction' : {
        this.deleteHandler(e.data);
        break;
      }
    }
  }
  deleteHandler(inputModel) {
    let entity = new GroupModel();
    entity.Id = inputModel.Id;
    this.exhibitionsService.ExDeleteAssignExecuter(entity).subscribe(res => {
      if (res.data.result) {
        this.success();
        this.ngOnInit();
      }
    });
  }
  save() {
    let find=this.data?.filter(res=>res.ExecuterId===this.formGroup.get('ExecuterId').value);
    if(find && find.length>0){
     this.error('ایتم تکراریست')
    }else {
      this.exhibitionsService.ExAssignExecuter(this.formGroup.value).subscribe(res => {
          if (res.data.result) {
            this.success();
            this.ngOnInit();
          } else {
            this.error(res.message);
          }
        },
        (err) => {
          this.error(err.error);
        });
    }
  }
  close() {
    this.modalService.dismissAll(false);
  }


  changeDropDown(e) {

    this.dpdown=e.Title;
    this.formGroup.get('ExecuterId').setValue(e.Id);
  }

  searchExecuter(query) {
    let y=this.executerDropDown.filter(x=>x.Title.indexOf(query.value)>-1);
    this.executerDropDown2=y;
  }
}
