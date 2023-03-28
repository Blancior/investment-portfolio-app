import {Component} from '@angular/core';
import {DashboardComponent} from "../dashboard.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent{
  constructor(public dashboard: DashboardComponent) {
    dashboard.numberOfTrades;
  }
}
