import {Component, OnInit} from '@angular/core';
import {LoginModel} from "./entity";
import {LoginService} from "./login.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {TokenService} from "../../utilities/services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: any;
  logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYQAAAHLCAYAAADIs+9qAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGsGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTA4LTIwVDE2OjA5OjUwKzA0OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wOC0yMFQxNjoxNzozNCswNDozMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMC0wOC0yMFQxNjoxNzozNCswNDozMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1ZGE1NmViNC1mYTg0LTI0NDUtYjhhMC01NTAyZTZhOTA0Y2QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6YjM4ZTVhZGQtODA2YS1hZDQxLTg4ZjQtOGU0MjRlZGUxZWUzIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YjM4ZTVhZGQtODA2YS1hZDQxLTg4ZjQtOGU0MjRlZGUxZWUzIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiMzhlNWFkZC04MDZhLWFkNDEtODhmNC04ZTQyNGVkZTFlZTMiIHN0RXZ0OndoZW49IjIwMjAtMDgtMjBUMTY6MDk6NTArMDQ6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4xIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTliN2JkYzEtOTE3OC0xZDQyLTgyZDQtNTc0NjlhZTM4MTRmIiBzdEV2dDp3aGVuPSIyMDIwLTA4LTIwVDE2OjEyOjU2KzA0OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjVkYTU2ZWI0LWZhODQtMjQ0NS1iOGEwLTU1MDJlNmE5MDRjZCIgc3RFdnQ6d2hlbj0iMjAyMC0wOC0yMFQxNjoxNzozNCswNDozMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsT4zGcAABwvSURBVHic7d1dkhs7DoRR9IQX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';
  ss = 's';
  constructor(private componentService: LoginService,
              private tokenService: TokenService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.tokenService.token.subscribe(res => {
      console.log(res);
      this.ss = res;
    });
    // let x = new LoginModel();
    // x.username = 'imnmadani';
    // x.password = 'Aa123456';
    // this.componentService.login(x).subscribe(res => {
    //   console.log(res);
    // });
  }

  createForm(): void {
    this.formGroup = new FormGroup({
      Username: new FormControl(null, Validators.required),
      Password: new FormControl(null, Validators.required),
    });
  }

  onSubmit(): void {
    this.componentService.login(this.formGroup.value).subscribe(res => {
      debugger;
      console.log(res.data.row.TokenCode);
      localStorage.setItem('token', res.data.row.TokenCode);
      this.router.navigateByUrl('/Dashboard');
      this.tokenService.setToken('iman');
      });
  }
}
