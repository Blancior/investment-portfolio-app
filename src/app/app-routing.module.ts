import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AssetComponent} from "./dashboard/asset/asset.component";
import {ManagementPanelComponent} from "./dashboard/management-panel/management-panel.component";
import {LoginComponentComponent} from "./login-component/login-component.component";
import {MainComponent} from "./dashboard/main/main.component";


const routes: Routes = [
  {path: '', redirectTo: '/main',pathMatch: 'full'},
  {path: 'main',  component: MainComponent},
  {path: 'asset', component: AssetComponent},
  {path: 'management-panel', component: ManagementPanelComponent},
  {path: 'login', component: LoginComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
