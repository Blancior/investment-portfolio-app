import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AssetComponent} from "./dashboard/asset/asset.component";
import {MainComponent} from "./dashboard/main/main.component";
import {AnalysePanelComponent} from "./dashboard/analyse-panel/analyse-panel.component";

const routes: Routes = [
  {path: '', redirectTo: '/main',pathMatch: 'full'},
  {path: 'main',  component: MainComponent},
  {path: 'asset', component: AssetComponent},
  {path: 'analyse-panel', component: AnalysePanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
