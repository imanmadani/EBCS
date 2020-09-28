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
import { ModalHeaderComponent } from './utilities/component/modal/modal-header/modal-header.component';
import { ModalFooterComponent } from './utilities/component/modal/modal-footer/modal-footer.component';
import { GroupListCreateComponent } from './portal/portal-main/groups/groups-list/group-list-create/group-list-create.component';
import { GroupListEditComponent } from './portal/portal-main/groups/groups-list/group-list-edit/group-list-edit.component';
import {ToastrModule} from "ngx-toastr";
import {BaseClass} from "./utilities/base";
import { GroupListAssignComponent } from './portal/portal-main/groups/groups-list/group-list-assign/group-list-assign.component';
import { ExhibitionsComponent } from './portal/portal-main/exhibitions/exhibitions.component';
import { ExhebitionGradesComponent } from './portal/portal-main/exhibitions/exhebition-grades/exhebition-grades.component';
import { ExhibitionGradeCreateComponent } from './portal/portal-main/exhibitions/exhebition-grades/exhibition-grade-create/exhibition-grade-create.component';
import { ExhibitionGradeEditComponent } from './portal/portal-main/exhibitions/exhebition-grades/exhibition-grade-edit/exhibition-grade-edit.component';
import { ExhibitionListComponent } from './portal/portal-main/exhibitions/exhibition-list/exhibition-list.component';
import { ExhibitionListCreateComponent } from './portal/portal-main/exhibitions/exhibition-list/exhibition-list-create/exhibition-list-create.component';
import { ExhibitionListEditComponent } from './portal/portal-main/exhibitions/exhibition-list/exhibition-list-edit/exhibition-list-edit.component';
import { ExhibitionHallGradesComponent } from './portal/portal-main/exhibitions/exhibition-hall-grades/exhibition-hall-grades.component';
import { ExhibitionHallListComponent } from './portal/portal-main/exhibitions/exhibition-hall-list/exhibition-hall-list.component';
import { ExhibitionHallGradeCreateComponent } from './portal/portal-main/exhibitions/exhibition-hall-grades/exhibition-hall-grade-create/exhibition-hall-grade-create.component';
import { ExhibitionHallGradeEditComponent } from './portal/portal-main/exhibitions/exhibition-hall-grades/exhibition-hall-grade-edit/exhibition-hall-grade-edit.component';
import { ExhibitionHallCreateComponent } from './portal/portal-main/exhibitions/exhibition-hall-list/exhibition-hall-create/exhibition-hall-create.component';
import { ExhibitionHallEditComponent } from './portal/portal-main/exhibitions/exhibition-hall-list/exhibition-hall-edit/exhibition-hall-edit.component';
import { ExhibitionAssignSalonComponent } from './portal/portal-main/exhibitions/exhibition-list/exhibition-assign-salon/exhibition-assign-salon.component';
import { DuallistComponent } from './utilities/component/duallist/duallist.component';
import { ExhibitionBoothListComponent } from './portal/portal-main/exhibitions/exhibition-booth-list/exhibition-booth-list.component';
import { ExhibitionBoothCreateComponent } from './portal/portal-main/exhibitions/exhibition-booth-list/exhibition-booth-create/exhibition-booth-create.component';
import { ExhibitionBoothEditComponent } from './portal/portal-main/exhibitions/exhibition-booth-list/exhibition-booth-edit/exhibition-booth-edit.component';
import { ExhibitionAssignExecuterComponent } from './portal/portal-main/exhibitions/exhibition-list/exhibition-assign-executer/exhibition-assign-executer.component';
import { BoothBuildersComponent } from './portal/portal-main/booth-builders/booth-builders.component';
import { BoothbuilderListComponent } from './portal/portal-main/booth-builders/boothbuilder-list/boothbuilder-list.component';
import { RateComponent } from './utilities/component/rate/rate.component';
import { BoothbuilderDeskComponent } from './portal/portal-main/booth-builders/boothbuilder-desk/boothbuilder-desk.component';
import { PortalParticipantsComponent } from './portal/portal-participants/portal-participants.component';
import { CountDownDayComponent } from './utilities/component/count-down-day/count-down-day.component';

@NgModule({
  declarations: [
    BaseClass,
    AppComponent,
    LoginComponent,
    PortalMainComponent,
    PortalMainComponent,
    GroupsListComponent,
    GroupsComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    GroupListCreateComponent,
    GroupListEditComponent,
    GroupListAssignComponent,
    ExhibitionsComponent,
    ExhebitionGradesComponent,
    ExhibitionGradeCreateComponent,
    ExhibitionGradeEditComponent,
    ExhibitionListComponent,
    ExhibitionListCreateComponent,
    ExhibitionListEditComponent,
    ExhibitionHallGradesComponent,
    ExhibitionHallListComponent,
    ExhibitionHallGradeCreateComponent,
    ExhibitionHallGradeEditComponent,
    ExhibitionHallCreateComponent,
    ExhibitionHallEditComponent,
    ExhibitionAssignSalonComponent,
    DuallistComponent,
    ExhibitionBoothListComponent,
    ExhibitionBoothCreateComponent,
    ExhibitionBoothEditComponent,
    ExhibitionAssignExecuterComponent,
    BoothBuildersComponent,
    BoothbuilderListComponent,
    RateComponent,
    BoothbuilderDeskComponent,
    PortalParticipantsComponent,
    CountDownDayComponent,
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
    Ng2SmartTableModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      },
    }),


  ],
  entryComponents: [
    RateComponent,
    BoothbuilderListComponent
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
