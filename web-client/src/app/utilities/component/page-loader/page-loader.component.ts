import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {LoaderService, LoaderState} from "../../services/loader.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.css']
})
export class PageLoaderComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        if(state.show){
          this.spinner.show();
        }else {
          setTimeout(() => {
            this.spinner.hide();
          }, 500);
        }
      });
  }

  ngOnDestroy() {
    this.spinner.hide();
    this.subscription.unsubscribe();
  }
}
