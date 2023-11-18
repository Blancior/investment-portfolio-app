import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {TradeModel} from "../models/trade-model";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  records$!: Observable<TradeModel[]>;

  constructor(
    private db: AngularFirestore
  ) {
    this.records$ = this.getTrades();
  }


  getTrades(): Observable<TradeModel[]>{
    return this.db.collection<TradeModel>('trades').valueChanges();
  }


  updateRecords(records$: Observable<TradeModel[]>) {
    this.records$ = records$;
  }

  getMaxDate(): Observable<string> {
    return this.db.collection('trades', ref => ref
      .orderBy('date', 'asc')
      .limit(1)
    ).get().pipe(
      map(querySnapshot => {
        let maxDate: string = '';
        querySnapshot.forEach(doc => {
          const data = doc.data() as { date: string };
          console.log(data.date);
          maxDate = data.date;
        });
        return maxDate;
      })
    );
  }
  getMinDate(): Observable<string> {
    return this.db.collection('trades', ref => ref
      .orderBy('date', 'desc')
      .limit(1)
    ).get().pipe(
      map(querySnapshot => {
        let maxDate: string = '';
        querySnapshot.forEach(doc => {
          const data = doc.data() as { date: string };
          console.log(data.date);
          maxDate = data.date;
        });
        return maxDate;
      })
    );
  }
  sumInvestedMoney(){
    this.db
      .collection<TradeModel>('trades')
      .snapshotChanges()
      .pipe(
        map((changes) => changes.map((c) => c.payload.doc.data().investedInUSD)),
        map((params) => params.reduce((prev, curr) => prev + curr, 0))
      )
      .subscribe((sum) => {
        return sum
      });
  }

  getNumberOfTrades(){
    this.db.collection('trades').get().toPromise().then(snapshot => {
      return snapshot.size;
    })
  }
  calcTime(date: any){
    let currentDate = new Date().toISOString();
    let date1 = Number(Date.parse(date));
    let date2 =Number(Date.parse(currentDate));
    return  Math.floor((date2 - date1)/(1000*60*60*24));
  }
  // getInvestedCryptos() {
  //   this.db.collection<TradeModel>('trades').get().toPromise().then((qSnap => {
  //     let recs = [];
  //     qSnap.forEach((doc) => {
  //       let name = doc.data().coinName;
  //       recs.push(name);
  //     });
  //     recs = recs.filter((item) => typeof item !== 'undefined');
  //     this.investedCoins = recs;
  //   }));
  //
  // }
}
