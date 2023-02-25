import {Component,Input} from '@angular/core';
import {Observable} from "rxjs";
import {Record} from "../dashboard.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent{
  @Input() trades: any[];
  @Input() maxTradeDate: any;
  @Input() minTradeDate: any;
  @Input() sumInvested$: Observable<number>;
  @Input() trades$: Observable<Record[]>;
}
