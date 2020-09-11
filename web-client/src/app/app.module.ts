import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbAlertModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './main/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from './main/auth/auth.interceptor';
import { PortalMainComponent } from './portal/portal-main/portal-main.component';
import {GroupsListComponent} from "./portal/portal-main/groups/groups-list/groups-list.component";
import {GroupsComponent} from "./portal/portal-main/groups/groups.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import { Ng2CompleterModule} from "ng2-completer";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PortalMainComponent,
    PortalMainComponent,
    GroupsListComponent,
    GroupsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2CompleterModule,
    Ng2SmartTableModule


  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    {provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi : true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
