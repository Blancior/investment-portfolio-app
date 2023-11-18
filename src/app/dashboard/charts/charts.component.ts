import {Component, Input} from '@angular/core';
import {TradeModel} from "../../models/trade-model";

@Component({
  selector: 'charts-component',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
@Input() currentPricesMap: Map<TradeModel,number>;

}
