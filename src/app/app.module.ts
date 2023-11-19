import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireModule} from '@angular/fire/compat';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { AssetComponent } from './dashboard/asset/asset.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../environments/evinronments";
import { MainComponent } from './dashboard/main/main.component';
import { ManagementPanelComponent } from './dashboard/management-panel/management-panel.component';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import { TradeDialogComponent } from './trade/trade-dialog/trade-dialog.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { NavbarComponent } from './navbar/navbar.component';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {HighchartsChartModule} from "highcharts-angular";
import { ChartsComponent } from './dashboard/charts/charts.component';
import {ChartsModule} from "./dashboard/charts/charts-panel/charts-panel";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import { ApiOverheatDialogComponent } from './dashboard/api-overheat-dialog/api-overheat-dialog.component'

const  MAT_DIALOG_GLOBAL_CONFIG:MatDialogConfig = {
  width:'700px',
  disableClose: true,
  hasBackdrop: true,

}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AssetComponent,
    MainComponent,
    ManagementPanelComponent,
    TradeDialogComponent,
    LoginComponentComponent,
    NavbarComponent,
    ChartsComponent,
    ChartsModule,
    ApiOverheatDialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
        MatCardModule,
        HighchartsChartModule,
        MatDatepickerModule,
        MatNativeDateModule

    ],
  providers: [
    MatDialog,
    DashboardComponent,
    ManagementPanelComponent,
    TradeDialogComponent,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: MAT_DIALOG_GLOBAL_CONFIG}
  ],
  bootstrap: [AppComponent]
})


export class AppModule {

}
