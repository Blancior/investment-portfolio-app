import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {TradeModel} from "../models/trade-model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  records$!: Observable<TradeModel[]>;
  private _recordsMap: BehaviorSubject<Map<string, number>> = new BehaviorSubject(new Map());

  constructor(
    private db: AngularFirestore,
    private http: HttpClient
  ) {
    this.records$ = this.getTrades();
  }

  get recordsMap$(): Observable<Map<string, number>> {
    return this._recordsMap.asObservable();
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
          maxDate = data.date;
        });
        return maxDate;
      })
    );
  }

  calcTime(date: any){
    let currentDate = new Date().toISOString();
    let date1 = Number(Date.parse(date));
    let date2 =Number(Date.parse(currentDate));
    return  Math.floor((date2 - date1)/(1000*60*60*24));
  }
  updateRecordsMap(newRecordsMap: Map<string, number>): void {
    this._recordsMap.next(newRecordsMap);
  }
  getSelectedCryptoInfo(selectedCrypto: string): Observable<any> {
    return this.http.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: selectedCrypto
      }
    });
  }
}
