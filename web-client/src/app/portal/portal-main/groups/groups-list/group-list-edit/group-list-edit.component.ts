import {Component, Input, OnInit} from '@angular/core';
import {GroupsService} from '../../groups.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-group-list-edit',
  templateUrl: './group-list-edit.component.html',
  styleUrls: ['./group-list-edit.component.css']
})
export class GroupListEditComponent implements OnInit {
  title='ایجاد گروه';
  formGroup:any ;
  @Input() model;
  constructor(private groupsService: GroupsService) { }

  ngOnInit(): void {
    debugger
    this.createForm();
    this.groupsService.getById(this.model.Id).subscribe(res=>{
      this.formGroup.patchValue(res.data.row);
    })
  }
  createForm() {
    this.formGroup = new FormGroup({
      Id: new FormControl(),
      Name: new FormControl(null, Validators.required)
    });
  }
  save() {
    debugger
    if (this.formGroup.valid === true) {
      this.groupsService.edit(this.formGroup.value).subscribe(data => {

          if (data.Errors.length > 0) {
            // this.errors(data.Errors);
          } else {
            if (data.IsSuccessed === true) {
              // this.close('success');
            }
          }
        },
        (err) => {
          // this.errors(err.error);
        });
    } else {
      // this.validateAllFormFields(this.formGroup);
    }
  }
  close(){

  }
}
