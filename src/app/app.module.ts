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
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { AssetComponent } from './dashboard/asset/asset.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../environments/evinronments";
import { MainComponent } from './dashboard/main/main.component';
import { ManagementPanelComponent } from './dashboard/management-panel/management-panel.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AssetComponent,
    MainComponent,
    ManagementPanelComponent,
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
        MatButtonModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule {

}
