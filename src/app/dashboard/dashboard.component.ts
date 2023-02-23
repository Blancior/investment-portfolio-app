import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  tradesAr: any[];
  maxDate: any;
  minDate: any;
  constructor(private db: AngularFirestore) {
    this.getMinDate();
    this.getMaxDate();

  }

  ngOnInit() {
    this.db.collection('trades').valueChanges().subscribe(trades => {
      this.tradesAr = trades;
      console.log(trades);
    });
  }
  // tu trzeba dorobic podawanie aktualnej ceny aktywa
  // getCurrentPrice(coinName: string) {
  //   const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinName}&vs_currencies=usd`;
  //   return this.http.get(url);
  // }
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
}
