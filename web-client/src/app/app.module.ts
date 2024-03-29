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
import { ExecuterBoothListComponent } from './portal/portal-main/executers/executer-booth-list/executer-booth-list.component';
import { ExecuterBoothCreateComponent } from './portal/portal-main/executers/executer-booth-list/executer-booth-create/executer-booth-create.component';
import { ExecuterBoothEditComponent } from './portal/portal-main/executers/executer-booth-list/executer-booth-edit/executer-booth-edit.component';
import { ExhibitionAssignExecuterComponent } from './portal/portal-main/exhibitions/exhibition-list/exhibition-assign-executer/exhibition-assign-executer.component';
import { BoothBuildersComponent } from './portal/portal-main/booth-builders/booth-builders.component';
import { BoothbuilderListComponent } from './portal/portal-main/booth-builders/boothbuilder-list/boothbuilder-list.component';
import { RateComponent } from './utilities/component/rate/rate.component';
import { BoothbuilderDeskComponent } from './portal/portal-main/booth-builders/boothbuilder-desk/boothbuilder-desk.component';
import { PortalParticipantsComponent } from './portal/portal-participants/portal-participants.component';
import { CountDownDayComponent } from './utilities/component/count-down-day/count-down-day.component';
import { ExhibitionHallAssignAdminComponent } from './portal/portal-main/exhibitions/exhibition-hall-list/exhibition-hall-assign-admin/exhibition-hall-assign-admin.component';
import { ExecutersComponent } from './portal/portal-main/executers/executers.component';
import { ExecuterListComponent } from './portal/portal-main/executers/executer-list/executer-list.component';
import { ExecuterCreateComponent } from './portal/portal-main/executers/executer-list/executer-create/executer-create.component';
import { ExecuterEditComponent } from './portal/portal-main/executers/executer-list/executer-edit/executer-edit.component';
import {HalladminsComponent} from "./portal/portal-main/hall-admins/halladmins.component";
import {HalladminListComponent} from "./portal/portal-main/hall-admins/halladmin-list/halladmin-list.component";
import {HalladminCreateComponent} from "./portal/portal-main/hall-admins/halladmin-list/halladmin-create/halladmin-create.component";
import {HalladminEditComponent} from "./portal/portal-main/hall-admins/halladmin-list/halladmin-edit/halladmin-edit.component";
import {TechnicalexpertsComponent} from "./portal/portal-main/technical-expert/technicalexperts.component";
import {TechnicalexpertCreateComponent} from "./portal/portal-main/technical-expert/technicalexpert-list/technicalexpert-create/technicalexpert-create.component";
import {TechnicalexpertEditComponent} from "./portal/portal-main/technical-expert/technicalexpert-list/technicalexpert-edit/technicalexpert-edit.component";
import {TechnicalexpertListComponent} from "./portal/portal-main/technical-expert/technicalexpert-list/technicalexpert-list.component";
import { HalladminDeskComponent } from './portal/portal-main/hall-admins/halladmin-desk/halladmin-desk.component';
import { FileUploadComponent } from './utilities/component/file-upload/file-upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import {TabsModule} from "ngx-bootstrap/tabs";
import { BoothbuilderPlanUploadComponent } from './portal/portal-main/booth-builders/boothbuilder-desk/boothbuilder-plan-upload/boothbuilder-plan-upload.component';
import { BoothbuilderCreateComponent } from './portal/portal-main/booth-builders/boothbuilder-list/boothbuilder-create/boothbuilder-create.component';
import { BoothbuilderEditComponent } from './portal/portal-main/booth-builders/boothbuilder-list/boothbuilder-edit/boothbuilder-edit.component';
import { ExhibitionAssignTechnicalexpertComponent } from './portal/portal-main/exhibitions/exhibition-list/exhibition-assign-technicalexpert/exhibition-assign-technicalexpert.component';
import { ExhibitionAssignArchitecturalexpertComponent } from './portal/portal-main/exhibitions/exhibition-list/exhibition-assign-architecturalexpert/exhibition-assign-architecturalexpert.component';
import { ArchitecturalExpertComponent } from './portal/portal-main/architectural-expert/architectural-expert.component';
import { ArchitecturalexpertListComponent } from './portal/portal-main/architectural-expert/architecturalexpert-list/architecturalexpert-list.component';
import { ArchitecturalexpertCreateComponent } from './portal/portal-main/architectural-expert/architecturalexpert-list/architecturalexpert-create/architecturalexpert-create.component';
import { ArchitecturalexpertEditComponent } from './portal/portal-main/architectural-expert/architecturalexpert-list/architecturalexpert-edit/architecturalexpert-edit.component';
import { BoothbuilderGradeComponent } from './portal/portal-main/booth-builders/boothbuilder-grade/boothbuilder-grade.component';
import { BoothbuilderGradeCreateComponent } from './portal/portal-main/booth-builders/boothbuilder-grade/boothbuilder-grade-create/boothbuilder-grade-create.component';
import { BoothbuilderGradeEditComponent } from './portal/portal-main/booth-builders/boothbuilder-grade/boothbuilder-grade-edit/boothbuilder-grade-edit.component';
import { TechnicalexpertDeskComponent } from './portal/portal-main/technical-expert/technicalexpert-desk/technicalexpert-desk.component';
import { TechnicalexpertFilemanagementComponent } from './portal/portal-main/technical-expert/technicalexpert-desk/technicalexpert-filemanagement/technicalexpert-filemanagement.component';
import {IvyGalleryModule} from "angular-gallery";
import { FinancialExpertComponent } from './portal/portal-main/financial-expert/financial-expert.component';
import { FinancialexpertListComponent } from './portal/portal-main/financial-expert/financialexpert-list/financialexpert-list.component';
import { FinancialexpertCreateComponent } from './portal/portal-main/financial-expert/financialexpert-list/financialexpert-create/financialexpert-create.component';
import { FinancialexpertEditComponent } from './portal/portal-main/financial-expert/financialexpert-list/financialexpert-edit/financialexpert-edit.component';
import { FinancialexpertDeskComponent } from './portal/portal-main/financial-expert/financialexpert-desk/financialexpert-desk.component';
import { SharedataComponent } from './portal/portal-main/sharedata/sharedata.component';
import { BoothbuilderinfringementListComponent } from './portal/portal-main/sharedata/boothbuilderinfringement-list/boothbuilderinfringement-list.component';
import { BoothbuilderinfringementEditComponent } from './portal/portal-main/sharedata/boothbuilderinfringement-list/boothbuilderinfringement-edit/boothbuilderinfringement-edit.component';
import { ArchitecturalexpertDeskComponent } from './portal/portal-main/architectural-expert/architecturalexpert-desk/architecturalexpert-desk.component';
import {BoothbuilderinfringementCreateComponent} from "./portal/portal-main/sharedata/boothbuilderinfringement-list/boothbuilderinfringement-create/boothbuilderinfringement-create.component";
import {BoothbuilderinfringementSetComponent} from "./portal/portal-main/architectural-expert/architecturalexpert-desk/boothbuilderinfringement-set/boothbuilderinfringement-set.component";
import { ArchitecturalexpertInfringementsComponent } from './portal/portal-main/architectural-expert/architecturalexpert-infringements/architecturalexpert-infringements.component';
import { ExecuterhallListComponent } from './portal/portal-main/executers/executerhall-list/executerhall-list.component';
import { ExecuterhallPlanUploadComponent } from './portal/portal-main/executers/executerhall-list/executerhall-plan-upload/executerhall-plan-upload.component';
import {NgPersianDatepickerModule} from "ng-persian-datepicker";
import { PortalParticipantBoothBuilderListComponent } from './portal/portal-participants/portal-participant-booth-builder-list/portal-participant-booth-builder-list.component';
import { PortalParticipantBoothbuilderPointComponent } from './portal/portal-participants/portal-participant-boothbuilder-point/portal-participant-boothbuilder-point.component';
import { RateDynamicComponent } from './utilities/component/rate-dynamic/rate-dynamic.component';
import { ExchangerateListComponent } from './portal/portal-main/sharedata/exchangerate-list/exchangerate-list.component';
import { ExchangerateCreateComponent } from './portal/portal-main/sharedata/exchangerate-list/exchangerate-create/exchangerate-create.component';
import { PortalMainDashbordComponent } from './portal/portal-main/portal-main-dashbord/portal-main-dashbord.component';
import { ExhibitionAssignHalladminComponent } from './portal/portal-main/exhibitions/exhibition-list/exhibition-assign-halladmin/exhibition-assign-halladmin.component';
import { ExecuterhallHalladminComponent } from './portal/portal-main/executers/executerhall-list/executerhall-halladmin/executerhall-halladmin.component';
import { ParticipantsComponent } from './portal/portal-main/participants/participants.component';
import {NgxSpinnerModule} from "ngx-spinner";
import { PageLoaderComponent } from './utilities/component/page-loader/page-loader.component';
import { ParticipantListComponent } from './portal/portal-main/participants/participant-list/participant-list.component';
import { SharedExhibitionComponent } from './main/shared-exhibition/shared-exhibition.component';
import { SharedExhibitionHallComponent } from './main/shared-exhibition/shared-exhibition-hall/shared-exhibition-hall.component';
import { HalladminCommentComponent } from './portal/portal-main/hall-admins/halladmin-desk/halladmin-comment/halladmin-comment.component';
import { UsersComponent } from './portal/portal-main/users/users.component';
import { UserListComponent } from './portal/portal-main/users/user-list/user-list.component';
import { UserCreateComponent } from './portal/portal-main/users/user-list/user-create/user-create.component';
import { LoginParticipantComponent } from './main/login-participant/login-participant.component';
import { ExecuterParticipantComponent } from './portal/portal-main/executers/executer-participant/executer-participant.component';
import { ExecuterParticipantCreateComponent } from './portal/portal-main/executers/executer-participant/executer-participant-create/executer-participant-create.component';
import { ExecuterParticipantEditComponent } from './portal/portal-main/executers/executer-participant/executer-participant-edit/executer-participant-edit.component';
import { PortalParticipantPolicyformComponent } from './portal/portal-participants/portal-participant-policyform/portal-participant-policyform.component';
import { BoothbuilderPolicyformComponent } from './portal/portal-main/booth-builders/boothbuilder-policyform/boothbuilder-policyform.component';
import { ElectricalExpertComponent } from './portal/portal-main/electrical-expert/electrical-expert.component';
import { ElectricalexpertListComponent } from './portal/portal-main/electrical-expert/electricalexpert-list/electricalexpert-list.component';
import { ElectricalexpertDeskComponent } from './portal/portal-main/electrical-expert/electricalexpert-desk/electricalexpert-desk.component';
import { ElectricalexpertCreateComponent } from './portal/portal-main/electrical-expert/electricalexpert-list/electricalexpert-create/electricalexpert-create.component';
import { ElectricalexpertEditComponent } from './portal/portal-main/electrical-expert/electricalexpert-list/electricalexpert-edit/electricalexpert-edit.component';
import { HeadquarterComponent } from './portal/portal-main/headquarter/headquarter.component';
import { HeadquarterDeskComponent } from './portal/portal-main/headquarter/headquarter-desk/headquarter-desk.component';
import { HeadquarterListComponent } from './portal/portal-main/headquarter/headquarter-list/headquarter-list.component';
import { HeadquarterCreateComponent } from './portal/portal-main/headquarter/headquarter-list/headquarter-create/headquarter-create.component';
import { HeadquarterEditComponent } from './portal/portal-main/headquarter/headquarter-list/headquarter-edit/headquarter-edit.component';
import { BoothBuilderDocumentsComponent } from './portal/portal-main/booth-builders/booth-builder-documents/booth-builder-documents.component';
import { BoothbuilderUpdateexpirelicenseComponent } from './portal/portal-main/booth-builders/boothbuilder-list/boothbuilder-updateexpirelicense/boothbuilder-updateexpirelicense.component';
import { BoothbuilderFilemanagementComponent } from './portal/portal-main/booth-builders/boothbuilder-list/boothbuilder-filemanagement/boothbuilder-filemanagement.component';
import { BoothbuilderChangeboothtypeComponent } from './portal/portal-main/booth-builders/boothbuilder-desk/boothbuilder-changeboothtype/boothbuilder-changeboothtype.component';
import { PaymentresultComponent } from './portal/portal-main/paymentresult/paymentresult.component';
import { ExecuterBoothBoothbuilderComponent } from './portal/portal-main/executers/executer-booth-list/executer-booth-boothbuilder/executer-booth-boothbuilder.component';
import { ReportsComponent } from './portal/portal-main/reports/reports.component';
import { BillCreateComponent } from './portal/portal-main/financial-expert/financialexpert-desk/bill-create/bill-create.component';
import { FinancialexpertBillComponent } from './portal/portal-main/financial-expert/financialexpert-bill/financialexpert-bill.component';
import {RouterModule} from "@angular/router";
import { ForgetpassComponent } from './main/login/forgetpass/forgetpass.component';
import { ChangepassComponent } from './portal/portal-main/changepass/changepass.component';
import { ArchitecturalexpertBoothComponent } from './portal/portal-main/architectural-expert/architecturalexpert-booth/architecturalexpert-booth.component';
import { ExecuterTaskComponent } from './portal/portal-main/executers/executer-task/executer-task.component';

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
    ExecuterBoothListComponent,
    ExecuterBoothCreateComponent,
    ExecuterBoothEditComponent,
    ExhibitionAssignExecuterComponent,
    BoothBuildersComponent,
    BoothbuilderListComponent,
    RateComponent,
    BoothbuilderDeskComponent,
    PortalParticipantsComponent,
    CountDownDayComponent,
    ExhibitionHallAssignAdminComponent,
    ExecutersComponent,
    ExecuterListComponent,
    ExecuterCreateComponent,
    ExecuterEditComponent,
    HalladminsComponent,
    HalladminCreateComponent,
    HalladminEditComponent,
    HalladminListComponent,
    TechnicalexpertsComponent,
    TechnicalexpertCreateComponent,
    TechnicalexpertEditComponent,
    TechnicalexpertListComponent,
    HalladminDeskComponent,
    FileUploadComponent,
    BoothbuilderPlanUploadComponent,
    BoothbuilderCreateComponent,
    BoothbuilderEditComponent,
    ExhibitionAssignTechnicalexpertComponent,
    ExhibitionAssignArchitecturalexpertComponent,
    ArchitecturalExpertComponent,
    ArchitecturalexpertListComponent,
    ArchitecturalexpertCreateComponent,
    ArchitecturalexpertEditComponent,
    BoothbuilderGradeComponent,
    BoothbuilderGradeCreateComponent,
    BoothbuilderGradeEditComponent,
    TechnicalexpertDeskComponent,
    TechnicalexpertFilemanagementComponent,
    FinancialExpertComponent,
    FinancialexpertListComponent,
    FinancialexpertCreateComponent,
    FinancialexpertEditComponent,
    FinancialexpertDeskComponent,
    SharedataComponent,
    BoothbuilderinfringementListComponent,
    BoothbuilderinfringementCreateComponent,
    BoothbuilderinfringementEditComponent,
    ArchitecturalexpertDeskComponent,
    BoothbuilderinfringementSetComponent,
    ArchitecturalexpertInfringementsComponent,
    ExecuterhallListComponent,
    ExecuterhallPlanUploadComponent,
    PortalParticipantBoothBuilderListComponent,
    PortalParticipantBoothbuilderPointComponent,
    RateDynamicComponent,
    ExchangerateListComponent,
    ExchangerateCreateComponent,
    PortalMainDashbordComponent,
    ExhibitionAssignHalladminComponent,
    ExecuterhallHalladminComponent,
    ParticipantsComponent,
    PageLoaderComponent,
    ParticipantListComponent,
    SharedExhibitionComponent,
    SharedExhibitionHallComponent,
    HalladminCommentComponent,
    UsersComponent,
    UserListComponent,
    UserCreateComponent,
    LoginParticipantComponent,
    ExecuterParticipantComponent,
    ExecuterParticipantCreateComponent,
    ExecuterParticipantEditComponent,
    PortalParticipantPolicyformComponent,
    BoothbuilderPolicyformComponent,
    ElectricalExpertComponent,
    ElectricalexpertListComponent,
    ElectricalexpertDeskComponent,
    ElectricalexpertCreateComponent,
    ElectricalexpertEditComponent,
    HeadquarterComponent,
    HeadquarterDeskComponent,
    HeadquarterListComponent,
    HeadquarterCreateComponent,
    HeadquarterEditComponent,
    BoothBuilderDocumentsComponent,
    BoothbuilderUpdateexpirelicenseComponent,
    BoothbuilderFilemanagementComponent,
    BoothbuilderChangeboothtypeComponent,
    PaymentresultComponent,
    ExecuterBoothBoothbuilderComponent,
    ReportsComponent,
    BillCreateComponent,
    FinancialexpertBillComponent,
    ForgetpassComponent,
    ChangepassComponent,
    ArchitecturalexpertBoothComponent,
    ExecuterTaskComponent

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
    FileUploadModule,
    IvyGalleryModule,
    NgPersianDatepickerModule,
    NgxSpinnerModule,
    TabsModule.forRoot(),
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
