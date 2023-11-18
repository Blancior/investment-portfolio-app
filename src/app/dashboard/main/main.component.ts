import {Component, OnDestroy, OnInit} from '@angular/core';
import {TradeModel} from "../../models/trade-model";
import {Observable, of, tap} from "rxjs";
import axios from "axios";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {TradeService} from "../../services/trade.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  maxDate: any;
  minDate: any;
  timeSinceMax: any;
  records$: Observable<TradeModel[]>;
  records: TradeModel[] = [];
  currentPricesMap: Map<string, number> = new Map<string, number>();
  coinNames: string[] = [];
  coinNames2: string[] = [];
  actual: number = 0;
  totalInv: number = 0;
  numberOfTrades = 0;

  investedCoins: string[] = [];
  dataLoaded: boolean = false;
  sortMode = false;
  constructor(public db: AngularFirestore,
              public tradeService: TradeService) {
  }

  ngOnInit(): void {
    if (!this.dataLoaded) {

      this.records$ = this.tradeService.getTrades().pipe(tap((res) => {
        this.records = res;
        this.coinNames = this.records.map((record: TradeModel) => record.coinName);
        this.getCurrentPrices().then(() => {
          this.records.forEach((record) => {
            record.coinName = record.coinName.toLowerCase()
            const value = record.priceusd * record.quantity;
            this.totalInv += record.investedInUSD
            this.actual += value;
            if (this.currentPricesMap.has(record.coinName)){
              const currentValue = this.currentPricesMap.get(record.coinName)
              this.currentPricesMap.set(record.coinName,currentValue+(value));
            }else this.currentPricesMap.set(record.coinName,value);
            this.tradeService.updateRecordsMap(this.currentPricesMap)

          })
        }).finally(() => {
          this.totalInv = Math.round(this.totalInv);
          this.actual = Math.round(this.actual * 100) / 100;
          this.numberOfTrades = this.records.length;
          this.tradeService.records$ = this.records$;
        });
      }));
      this.dataLoaded = true;
    }
    this.records.forEach(record => {
      this.totalInv += record.priceusd * record.quantity
    })

    this.tradeService.getMaxDate().subscribe(max => {
      this.maxDate = max;
    });
    this.tradeService.getMinDate().subscribe(min => {
      this.minDate = min;
    })

  }

  ngOnDestroy(): void {
    this.minDate.unsubscribe;
    this.maxDate.unsubscribe;
  }


  sortByDate(mode:string) {
    this.sortMode = !this.sortMode;
    switch (mode) {
      case 'date': {
        const sortedItems = [...this.records].sort((a, b) => this.sortMode ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));
        this.records$ = of(sortedItems);
        break;
      }
      case 'amount':{
        const sorted = [...this.records].sort((a,b)=> this.sortMode ? a.quantity - b.quantity : b.quantity - a.quantity);
        this.records$ = of(sorted);
        break;
      }
      case 'price':{
        const sorted = [...this.records].sort((a,b)=> this.sortMode ? a.priceusd - b.priceusd : b.priceusd - a.priceusd);
        this.records$ = of(sorted);
        break;
      }
      case 'value':{
        const sorted = [...this.records].sort((a,b)=> this.sortMode ?
          a.priceusd*a.quantity - b.priceusd*b.quantity :
          b.priceusd*a.quantity - a.priceusd*a.quantity);
        this.records$ = of(sorted);
        break;
      }
      case 'name':{
        const sorted = [...this.records].sort((a,b)=> this.sortMode ? a.coinName.localeCompare(b.coinName) : b.coinName.localeCompare(a.coinName));
        this.records$ = of(sorted);
        break;
      }
    }
  }


  async getCurrentPrices() {
    await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=' + this.coinNames.toString() + '&vs_currencies=usd').then((res)=>{
      const pricesData = res.data;
      this.records.forEach((record) => {
        record.priceusd = pricesData[record.coinName.toLowerCase()].usd;
      })
    }).catch((error)=>{
      console.log(error,'XDDDDDD')
    });


  }

}
