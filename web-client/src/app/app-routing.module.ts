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
import {ExhibitionBoothListComponent} from "./portal/portal-main/exhibitions/exhibition-booth-list/exhibition-booth-list.component";
import {BoothBuildersComponent} from "./portal/portal-main/booth-builders/booth-builders.component";
import {BoothbuilderListComponent} from "./portal/portal-main/booth-builders/boothbuilder-list/boothbuilder-list.component";
import {BoothbuilderDeskComponent} from "./portal/portal-main/booth-builders/boothbuilder-desk/boothbuilder-desk.component";
import {AuthGuard} from "./main/auth/auth.guard";
import {PortalParticipantsComponent} from "./portal/portal-participants/portal-participants.component";

const routes: Routes = [
  {path: '', redirectTo: '/Login', pathMatch: 'full'},
  {path: 'Login', component: LoginComponent},
  {
    path: 'Dashboard',
    component: PortalMainComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'Groups',
        component: GroupsComponent,
        children: [
          {
            path: 'GroupsList',
            component: GroupsListComponent,
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
          {
            path: 'BoothList',
            component: ExhibitionBoothListComponent,
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
        ]
      },
      {
        path: 'Executers',
        component: BoothBuildersComponent,
      },
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
