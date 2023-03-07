import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {TradeModel} from "../../models/trade-model";
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
  @Input() maxTradeDate: any;
  @Input() minTradeDate: any;
  @Input() sumInv: number;
  @Input() trades$: Observable<TradeModel[]>;
  @Input() actualPrice: number;

}
