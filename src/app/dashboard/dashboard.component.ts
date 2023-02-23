import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable } from 'rxjs';

interface Record{
  coinName:string,
  quantity:number,
  priceusd:number,
  investedInUSD:number;
  date: string;
}
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tradesAr: any[];
  maxDate: any;
  minDate: any;
  totalInvested$: Observable<number>;
  constructor(private db: AngularFirestore) {
    this.getMinDate();
    this.getMaxDate();
    this.sumInvestedMoney();
  }

  ngOnInit() {
    this.db.collection('trades').valueChanges().subscribe(trades => {
      this.tradesAr = trades;
      console.log(trades);
    });
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
    this.totalInvested$ = this.db.collection<Record>('trades').valueChanges()
      .pipe(
        map(data => data.reduce((acc, curr) => acc + curr.investedInUSD, 0))
      );
  }
}
