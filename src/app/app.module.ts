import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { AssetComponent } from './asset/asset.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AssetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
