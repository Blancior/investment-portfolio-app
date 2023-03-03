import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {combineLatest, map, Observable} from "rxjs";
import {TradeModel} from "../../models/trade-model";
import axios from "axios";
import { MatDialog} from "@angular/material/dialog";
import {TradeDetailsComponent} from "../../trade/trade-details/trade-details.component";

@Component({
  selector: 'management-panel',
  templateUrl: 'management-panel.component.html',
  styleUrls: ['./management-panel.component.scss', '../main/main.component.scss']
})
export class ManagementPanelComponent implements OnInit{

  sumInvested$: Observable<number>;
  trades$: Observable<TradeModel[]>;
  CnameI:string;
  CQuantI:number;
  CInvestedMoneyI:number;
  CDateI:string = new Date().toISOString().slice(0,19);
  constructor(
    private db: AngularFirestore,
    private dialog: MatDialog,
  ) {
    this.getTrades();
    this.db.collection<TradeModel>('trades').get().subscribe(querySnapshot => {
      const names: any[] = querySnapshot.docs.map(doc => doc.data().coinName);
      console.log(names.join(','));
      this.getCurrentPrices();
    });
    this.sumInvestedMoney();
  }
  ngOnInit() {
  }
  getTrades(): Observable<TradeModel[]>{
   return this.db.collection<TradeModel>('trades').snapshotChanges().pipe(map(res => res.map(trade => this.assignKey(trade))));
  }
  assignKey(trade: any){
    return {...trade.payload.val(),key: trade.key}
  }
  addTrade(){
    this.CDateI= new Date().toISOString().slice(0,19);
    const rc = this.db.collection('trades');
    rc.add({
      coinName: this.CnameI,
      investedInUSD: this.CInvestedMoneyI,
      quantity: this.CQuantI,
      date: this.CDateI,
    });
  }
  deleteRecord(coinName: string, quantity: number, date: string) {
    this.db.collection('trades', ref => ref
      .where('coinName', '==', coinName)
      .where('quantity', '==', quantity)
      .where('date', '==', date)
    ).get().toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
  }
  sumInvestedMoney(){
    this.sumInvested$ = this.db.collection<TradeModel>('trades').valueChanges()
      .pipe(
        map(data => data.reduce((acc, curr) => acc + curr.investedInUSD, 0))
      );
  }
  getCurrentPrices(){
    this.trades$ = this.db.collection<TradeModel>('trades').valueChanges();
    this.trades$ = combineLatest([
      this.trades$, axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,dogecoin&vs_currencies=usd')
        .then(response => response.data)
    ]).pipe(
      map(([records, prices]) => {
        return records.map(record => {
          record.priceusd = prices[record.coinName.toLowerCase()].usd;
          return record;
        });
      })
    );
  }
  goToEdit(trade: any){
    this.dialog.open(TradeDetailsComponent,{data: trade});
  }
}
