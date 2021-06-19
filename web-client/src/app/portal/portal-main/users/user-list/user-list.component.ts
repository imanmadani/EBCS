import { Component, OnInit } from '@angular/core';
import {BaseClass} from "../../../../utilities/base";
import * as moment from "jalali-moment";
import {SharedataService} from "../../sharedata/sharedata.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {ExchangerateCreateComponent} from "../../sharedata/exchangerate-list/exchangerate-create/exchangerate-create.component";
import {UserCreateComponent} from "./user-create/user-create.component";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseClass implements OnInit {
  settings = {
    columns: {
      Username: {
        title: 'نام کاربری',
      },
      Name: {
        title: 'نام',
      },
      Mobile: {
        title: 'موبایل',
      },
      GroupName:{
        title:'نام گروه'
      },
      FlagBlock: {
        title: 'وضعیت',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value === "0") return '<i class="fa fa-circle pr-3  text-success" title="فعال"></i>';
          return '<i class="fa fa-circle pr-3  text-warning" title="غیر فعال"></i>';
        },
      }
    },
    actions: {
      columnTitle: 'عملیات',
      width: '300px',
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    }
  };
  data;

  constructor(private usersService: UsersService,
              private modalService: NgbModal,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    this.usersService.get().subscribe(res => {
      this.data = res.data.rows;
    });
  }

  methodHandler(e) {
    switch (e.action) {
      case 'createAction' : {
        this.createHandler();
        break;
      }

    }
  }

  createHandler() {
    let modalRef = this.modalService.open(UserCreateComponent, {centered: true});
    modalRef.result.then((data) => {
    }, (reason) => {
      if (reason)
        this.ngOnInit();
    });
  }

  blockHandler(inputModel) {

  }
}
