import {Component, OnInit,} from '@angular/core';
import * as Highcharts from 'highcharts';
import {TradeService} from "../../../services/trade.service";


@Component({
  selector: 'charts-module',
  templateUrl: `charts-panel.html`
})

export class ChartsModule implements OnInit{
  coinsMap: Map<string,number> = new Map<string, number>();

  constructor(private tradeService: TradeService) {
  }

  ngOnInit(): void {
    this.tradeService.recordsMap$.subscribe(map => {
      this.coinsMap = map;
      this.updateChart()
    })

  }

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Value of each currency in USD'
    },
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
      data: Array.from(this.coinsMap)
        .map(([record, value]) =>
          ({ name: record, y: value })),
      type: 'pie'
    }],

  }; // required
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) {}
   // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

  updateChart() {
    this.chartOptions.series = [{
      name: 'Value in USD',
      data: Array.from(this.coinsMap)
        .map(([record, value]) => ({ name: record, y: Math.round((value)*100)/100 })),
      type: 'pie'
    }];
    this.updateFlag = true;
  }
}


