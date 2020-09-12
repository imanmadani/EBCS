import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupsService } from '../../groups.service';

@Component({
  selector: 'app-group-list-create',
  templateUrl: './group-list-create.component.html',
  styleUrls: ['./group-list-create.component.css']
})
export class GroupListCreateComponent implements OnInit {
  title='ایجاد گروه';
  formGroup:any ;
  constructor(private groupsService: GroupsService) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.formGroup = new FormGroup({
      Name: new FormControl(null, Validators.required)
    });
  }
  save() {
    debugger
      if (this.formGroup.valid === true) {
        this.groupsService.create(this.formGroup.value).subscribe(data => {

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
