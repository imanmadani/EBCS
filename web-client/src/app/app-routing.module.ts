import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './main/login/login.component';
import {PortalMainComponent} from './portal/portal-main/portal-main.component';
import {GroupsComponent} from "./portal/portal-main/groups/groups.component";
import {GroupsListComponent} from "./portal/portal-main/groups/groups-list/groups-list.component";
import {ExhibitionsComponent} from './portal/portal-main/exhibitions/exhibitions.component';
import {ExhebitionGradesComponent} from './portal/portal-main/exhibitions/exhebition-grades/exhebition-grades.component';
import {ExhibitionListComponent} from './portal/portal-main/exhibitions/exhibition-list/exhibition-list.component';
import {ExhibitionHallListComponent} from './portal/portal-main/exhibitions/exhibition-hall-list/exhibition-hall-list.component';
import {ExhibitionHallGradesComponent} from './portal/portal-main/exhibitions/exhibition-hall-grades/exhibition-hall-grades.component';
import {ExecuterBoothListComponent} from "./portal/portal-main/executers/executer-booth-list/executer-booth-list.component";
import {BoothBuildersComponent} from "./portal/portal-main/booth-builders/booth-builders.component";
import {BoothbuilderListComponent} from "./portal/portal-main/booth-builders/boothbuilder-list/boothbuilder-list.component";
import {BoothbuilderDeskComponent} from "./portal/portal-main/booth-builders/boothbuilder-desk/boothbuilder-desk.component";
import {PortalParticipantsComponent} from "./portal/portal-participants/portal-participants.component";
import {ExecutersComponent} from "./portal/portal-main/executers/executers.component";
import {ExecuterListComponent} from "./portal/portal-main/executers/executer-list/executer-list.component";
import {HalladminsComponent} from "./portal/portal-main/hall-admins/halladmins.component";
import {HalladminListComponent} from "./portal/portal-main/hall-admins/halladmin-list/halladmin-list.component";
import {TechnicalexpertListComponent} from "./portal/portal-main/technical-expert/technicalexpert-list/technicalexpert-list.component";
import {TechnicalexpertsComponent} from "./portal/portal-main/technical-expert/technicalexperts.component";
import {HalladminDeskComponent} from "./portal/portal-main/hall-admins/halladmin-desk/halladmin-desk.component";
import {ArchitecturalexpertListComponent} from "./portal/portal-main/architectural-expert/architecturalexpert-list/architecturalexpert-list.component";
import {ArchitecturalExpertComponent} from "./portal/portal-main/architectural-expert/architectural-expert.component";
import {BoothbuilderGradeComponent} from "./portal/portal-main/booth-builders/boothbuilder-grade/boothbuilder-grade.component";
import {TechnicalexpertDeskComponent} from "./portal/portal-main/technical-expert/technicalexpert-desk/technicalexpert-desk.component";
import {FinancialExpertComponent} from "./portal/portal-main/financial-expert/financial-expert.component";
import {FinancialexpertListComponent} from "./portal/portal-main/financial-expert/financialexpert-list/financialexpert-list.component";
import {FinancialexpertDeskComponent} from "./portal/portal-main/financial-expert/financialexpert-desk/financialexpert-desk.component";
import {SharedataComponent} from "./portal/portal-main/sharedata/sharedata.component";
import {BoothbuilderinfringementListComponent} from "./portal/portal-main/sharedata/boothbuilderinfringement-list/boothbuilderinfringement-list.component";
import {ArchitecturalexpertDeskComponent} from "./portal/portal-main/architectural-expert/architecturalexpert-desk/architecturalexpert-desk.component";
import {ArchitecturalexpertInfringementsComponent} from "./portal/portal-main/architectural-expert/architecturalexpert-infringements/architecturalexpert-infringements.component";
import {ExecuterhallListComponent} from "./portal/portal-main/executers/executerhall-list/executerhall-list.component";
import {ExchangerateListComponent} from "./portal/portal-main/sharedata/exchangerate-list/exchangerate-list.component";
import {PortalMainDashbordComponent} from "./portal/portal-main/portal-main-dashbord/portal-main-dashbord.component";
import {ParticipantsComponent} from "./portal/portal-main/participants/participants.component";
import {ParticipantListComponent} from "./portal/portal-main/participants/participant-list/participant-list.component";
import {SharedExhibitionComponent} from "./main/shared-exhibition/shared-exhibition.component";
import {UserListComponent} from "./portal/portal-main/users/user-list/user-list.component";
import {UsersComponent} from "./portal/portal-main/users/users.component";
import {LoginParticipantComponent} from "./main/login-participant/login-participant.component";
import {ExecuterParticipantComponent} from "./portal/portal-main/executers/executer-participant/executer-participant.component";
import {ElectricalExpertComponent} from "./portal/portal-main/electrical-expert/electrical-expert.component";
import {ElectricalexpertListComponent} from "./portal/portal-main/electrical-expert/electricalexpert-list/electricalexpert-list.component";
import {ElectricalexpertDeskComponent} from "./portal/portal-main/electrical-expert/electricalexpert-desk/electricalexpert-desk.component";
import {HeadquarterComponent} from "./portal/portal-main/headquarter/headquarter.component";
import {HeadquarterListComponent} from "./portal/portal-main/headquarter/headquarter-list/headquarter-list.component";
import {HeadquarterDeskComponent} from "./portal/portal-main/headquarter/headquarter-desk/headquarter-desk.component";
import {BoothBuilderDocumentsComponent} from "./portal/portal-main/booth-builders/booth-builder-documents/booth-builder-documents.component";
import {PaymentresultComponent} from "./portal/portal-main/paymentresult/paymentresult.component";
import {ReportsComponent} from "./portal/portal-main/reports/reports.component";
import {FinancialexpertBillComponent} from "./portal/portal-main/financial-expert/financialexpert-bill/financialexpert-bill.component";
import {ArchitecturalexpertBoothComponent} from "./portal/portal-main/architectural-expert/architecturalexpert-booth/architecturalexpert-booth.component";
import {ExecuterTaskComponent} from "./portal/portal-main/executers/executer-task/executer-task.component";

const routes: Routes = [
  {path: '', redirectTo: '/Login', pathMatch: 'full'},
  {path: 'Login', component: LoginComponent},
  {path: 'LoginParticipant', component: LoginParticipantComponent},
  {path: 'Exhibitions', component: SharedExhibitionComponent},
  {
    path: 'Dashboard',
    component: PortalMainComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PortalMainDashbordComponent,
      },
      {
        path: 'PaymentResult',
        component: PaymentresultComponent,
      },
      {
        path: 'Reports',
        component: ReportsComponent,
      },
      {
        path: 'Groups',
        component: GroupsComponent,
        children: [
          {
            path: 'GroupList',
            component: GroupsListComponent,
          }]
      },
      {
        path: 'Users',
        component: UsersComponent,
        children: [
          {
            path: 'UserList',
            component: UserListComponent,
          }]
      },
      {
        path: 'Exhibitions',
        component: ExhibitionsComponent,
        children: [
          {
            path: 'ExhibitionGradeList',
            component: ExhebitionGradesComponent,
          },
          {
            path: 'ExhibitionList',
            component: ExhibitionListComponent,
          },
          {
            path: 'HallGradeList',
            component: ExhibitionHallGradesComponent,
          },
          {
            path: 'HallList',
            component: ExhibitionHallListComponent,
          },

        ]
      },
      {
        path: 'BoothBuilders',
        component: BoothBuildersComponent,
        children: [
          {
            path: 'BoothbuilderList',
            component: BoothbuilderListComponent,
          },
          {
            path: 'BoothbuilderDesk',
            component: BoothbuilderDeskComponent,
          },
          {
            path: 'BoothbuilderGrade',
            component: BoothbuilderGradeComponent,
          },
          {
            path: 'BoothbuilderDocuments',
            component: BoothBuilderDocumentsComponent,
          },
          {
            path: 'ParticipnatExecuter',
            component: ExecuterParticipantComponent,
          },
          {
            path: 'BoothList',
            component: ExecuterBoothListComponent,
          },
        ]
      },
      {
        path: 'Executers',
        component: ExecutersComponent,
        children:[
          {
            path: 'ExecuterList',
            component: ExecuterListComponent,
          },
          {
            path: 'ParticipnatExecuter',
            component: ExecuterParticipantComponent,
          },
          {
            path: 'BoothList',
            component: ExecuterBoothListComponent,
          },
          {
            path: 'HallList',
            component: ExecuterhallListComponent,
          },
          {
            path: 'ExecuterDesk',
            component: ExecuterTaskComponent,
          },
        ]
      },
      {
        path: 'HallAdmins',
        component: HalladminsComponent,
        children:[
          {
            path: 'HallAdminList',
            component: HalladminListComponent,
          },
          {
            path: 'HallAdminDesk',
            component: HalladminDeskComponent,
          },
        ]
      },
      {
        path: 'TechnicalExperts',
        component: TechnicalexpertsComponent,
        children:[
          {
            path: 'TechnicalExpertList',
            component: TechnicalexpertListComponent,
          },
          {
            path: 'TechnicalExpertDesk',
            component: TechnicalexpertDeskComponent,
          },
        ]
      },
      {
        path: 'ArchitecturalExperts',
        component: ArchitecturalExpertComponent,
        children:[
          {
            path: 'ArchitecturalExpertList',
            component: ArchitecturalexpertListComponent,
          },
          {
            path: 'ArchitecturalExpertDesk',
            component: ArchitecturalexpertDeskComponent,
          },
          {
            path: 'ArchitecturalExpertInfringements',
            component: ArchitecturalexpertInfringementsComponent,
          },
          {
            path: 'BoothList',
            component: ArchitecturalexpertBoothComponent,
          },
        ]
      },
      {
        path: 'FinancialExperts',
        component: FinancialExpertComponent,
        children:[
          {
            path: 'FinancialExpertList',
            component: FinancialexpertListComponent,
          },
          {
            path: 'FinancialExpertDesk',
            component: FinancialexpertDeskComponent,
          },
          {
            path: 'FinancialExpertBills',
            component: FinancialexpertBillComponent,
          },

        ]
      },
      {
        path: 'Participants',
        component: ParticipantsComponent,
        children:[
          {
            path: 'ParticipantList',
            component: ParticipantListComponent,
          }
        ]
      },
      {
        path: 'ShareData',
        component: SharedataComponent,
        children:[
          {
            path: 'BoothBuilderInfringementList',
            component: BoothbuilderinfringementListComponent,
          },
          {
            path: 'ExchangeRateList',
            component: ExchangerateListComponent,
          }
        ]
      },
      {
        path: 'ElectricalExperts',
        component: ElectricalExpertComponent,
        children:[
          {
            path: 'ElectricalExpertList',
            component: ElectricalexpertListComponent,
          },
          {
            path: 'ElectricalExpertDesk',
            component: ElectricalexpertDeskComponent,
          },
        ]
      },
      {
        path: 'HeadQuarters',
        component: HeadquarterComponent,
        children:[
          {
            path: 'HeadQuarterList',
            component: HeadquarterListComponent,
          },
          {
            path: 'HeadQuarterDesk',
            component: HeadquarterDeskComponent,
          },
        ]
      }
      ]
  },
  {
    path: 'Participant',
    component: PortalParticipantsComponent
  }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
