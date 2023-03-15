import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AssetComponent} from "./dashboard/asset/asset.component";
import {ManagementPanelComponent} from "./dashboard/management-panel/management-panel.component";
import {DashboardComponent} from "./dashboard/dashboard.component";


const routes: Routes = [
  {path: '', redirectTo: '/main',pathMatch: 'full'},
  {path: 'main',  component: DashboardComponent},
  {path: 'asset', component: AssetComponent},
  {path: 'management-panel', component: ManagementPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
