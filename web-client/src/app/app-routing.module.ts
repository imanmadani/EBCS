import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './main/login/login.component';
import {AuthGuard} from './main/auth/auth.guard';
import {PortalMainComponent} from './portal/portal-main/portal-main.component';

const routes: Routes = [
  {path: '', redirectTo: '/Login', pathMatch: 'full'},
  {path: 'Login', component: LoginComponent},
  {
    path: 'Dashboard',
    component: PortalMainComponent,
    canActivate: [AuthGuard],
    // children: [
    //   {
    //     // path: '',
    //     // component: AdminStartComponent,
    //   }]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
