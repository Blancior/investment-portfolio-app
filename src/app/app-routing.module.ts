import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AssetComponent} from "./dashboard/asset/asset.component";
import {MainComponent} from "./dashboard/main/main.component";

const routes: Routes = [
  {path: '', redirectTo: '/main',pathMatch: 'full'},
  {path: 'main',  component: MainComponent},
  {path: 'asset', component: AssetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
