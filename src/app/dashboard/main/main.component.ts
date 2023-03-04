import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {TradeModel} from "../../models/trade-model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent{
  @Input() maxTradeDate: any;
  @Input() minTradeDate: any;
  @Input() sumInv: number;
  @Input() trades$: Observable<TradeModel[]>;
  @Input() actualPrice: number;

}
