import { Component, OnInit } from '@angular/core';
import {LoginModel} from "./entity";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private componentService: LoginService,) { }

  ngOnInit(): void {
   let x= new LoginModel();
   x.username='imnmadani';
   x.password='Aa123456';
   this.componentService.login(x).subscribe(res=>{
     console.log(res);
   })

  }

}
