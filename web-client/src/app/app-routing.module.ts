import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './main/login/login.component';
import {PortalMainComponent} from './portal/portal-main/portal-main.component';
import {GroupsComponent} from "./portal/portal-main/groups/groups.component";
import {GroupsListComponent} from "./portal/portal-main/groups/groups-list/groups-list.component";

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
      }]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
