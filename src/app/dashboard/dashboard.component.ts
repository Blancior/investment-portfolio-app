import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {combineLatest, map, Observable} from 'rxjs';
import {TradeModel} from "../models/trade-model";
import axios from "axios";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  maxDate: any;
  minDate: any;
  totalInvested$: Observable<number>;
  records$: Observable<TradeModel[]>;
  coinNames: string[];
  actual: number;
  profit$ : Observable<number>;
  constructor(private db: AngularFirestore) {
    this.getMinDate();
    this.getMaxDate();
    this.sumInvestedMoney();
    this.db.collection<TradeModel>('trades').get().subscribe(querySnapshot => {
      const names: any[] = querySnapshot.docs.map(doc => doc.data().coinName);
      console.log(names.join(','));
      this.getCurrentPrices();
    });
    this.profit$ = combineLatest([this.totalInvested$]).pipe(
      map(([totalInvested$])=> this.actual/totalInvested$));
  }

  ngOnInit() {

  }
  getMaxDate(){
    this.db.collection('trades', ref => ref
      .orderBy('date', 'desc')
      .limit(1)
    ).get().toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = doc.data() as { date: string};
        this.maxDate = data.date;
      });
    });
  }
  getMinDate(){
    this.db.collection('trades', ref => ref.orderBy('date',"asc").limit(1)
    ).get().toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = doc.data() as { date: string};
        this.minDate = data.date;
      });
    }).catch(error => {console.log(error)});
  }
  sumInvestedMoney(){
    this.totalInvested$ = this.db.collection<TradeModel>('trades').valueChanges()
      .pipe(
        map(data => data.reduce((acc, curr) => acc + curr.investedInUSD, 0))
      );
  }
  getCurrentPrices(){
    this.records$ = this.db.collection<TradeModel>('trades').valueChanges();
    this.records$ = combineLatest([
      this.records$, axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,dogecoin&vs_currencies=usd')
        .then(response => response.data)
    ]).pipe(
      map(([records, prices]) => {
        return records.map(record => {
          record.priceusd = prices[record.coinName.toLowerCase()].usd;
          this.actual+=(record.priceusd*record.quantity);
          return record;
        });
      })
    );
  }
}
