import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AssetComponent} from "./dashboard/asset/asset.component";
import {ManagementPanelComponent} from "./dashboard/management-panel/management-panel.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EditTradeComponent} from "./trade/edit-trade/edit-trade.component";

const routes: Routes = [
  {path: '', redirectTo: 'main',pathMatch: 'full'},
  {path: 'main',  component: DashboardComponent},
  {path: 'asset', component: AssetComponent},
  {path: 'management-panel', component: ManagementPanelComponent,
    children: [
      {path: '',redirectTo: 'management-panel', pathMatch: 'full'},
      {path: 'edit-trade/:key', component: EditTradeComponent}
    ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
