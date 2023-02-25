import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";

interface Record{
  coinName:string,
  quantity:number,
  priceusd:number,
  investedInUSD:number;
  date: string;
}
@Component({
  selector: 'management-panel',
  templateUrl: 'management-panel.component.html',
  styleUrls: ['./management-panel.component.scss', '../main/main.component.scss']
})
export class ManagementPanelComponent implements OnInit{

  sumInvested$: Observable<number>;
  trades:any[];
  CnameI:string;
  CQuantI:number;
  CInvestedMoneyI:number;
  CDateI:string = new Date().toISOString().slice(0,19);
  constructor(private db: AngularFirestore) {
    this.sumInvestedMoney();
  }
  ngOnInit() {
    // setInterval(() => {
    //   this.CDateI = new Date().toString();
    // },1000);
    this.db.collection('trades').valueChanges().subscribe(trades => {
      this.trades = trades;
    });
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
  deleteRecord(coinName: string, quantity: string, date: string) {
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
    this.sumInvested$ = this.db.collection<Record>('trades').valueChanges()
      .pipe(
        map(data => data.reduce((acc, curr) => acc + curr.investedInUSD, 0))
      );
  }
}
