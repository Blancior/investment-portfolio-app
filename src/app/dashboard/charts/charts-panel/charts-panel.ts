import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import {TradeModel} from "../../../models/trade-model";
import {TradeService} from "../../../services/trade.service";


@Component({
  selector: 'charts-module',
  templateUrl: `charts-panel.html`
})

export class ChartsModule implements OnInit,OnChanges{
  @Input() currentPricesMap!: Map<TradeModel,number>;
  tabka1: Map<TradeModel,number> = new Map<TradeModel, number>();

  constructor(private tradeService: TradeService) {

  }

  ngOnInit(): void {
    console.log(this.tabka1,'adadadad');
    this.tabka1 = this.currentPricesMap;
    this.updateChart(this.tabka1);
    console.log(this.currentPricesMap.entries().next().value,'sdfgsdsdgsdgsdg')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPricesMap'] && this.currentPricesMap) {
      for (const changesKey in this.currentPricesMap) {
        this.tabka1 = this.currentPricesMap.entries().next().value;
      }

      this.updateChart(this.tabka1);
    }
  }


  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    plotOptions: {
      series: {
        // general options for all series
      },
      pie: {
        // shared options for all pie series
      }
    },
    series: [{
      name: 'Name',
      data: Array.from(this.tabka1.entries())
        .map(([record, value]) =>
          ({ name: record.coinName, y: value })),
      type: 'pie'
    }],

  }; // required
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  updateChart(records: Map<TradeModel,number>) {
    console.log('ChartsModule updateChart', records);
    this.chartOptions.series = [{
      name: 'Value',
      data: Array.from(this.tabka1.entries())
        .map(([record, value]) => ({ name: record.coinName, y: Math.round((record.quantity * record.priceusd)*100)/100 })),
      type: 'pie'
    }];
    this.updateFlag = true;
  }
}


