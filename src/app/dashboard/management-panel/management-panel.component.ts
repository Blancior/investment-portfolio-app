import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'management-panel',
  templateUrl: 'management-panel.component.html',
  styleUrls: ['./management-panel.component.scss', '../main/main.component.scss']
})
export class ManagementPanelComponent implements OnInit{
  trades:any[];
  CnameI:string;
  CQuantI:string;
  CPriceI:string;
  sum:number;
  CInvestedMoneyI:string;
  CDateI:string = new Date().toDateString();
  constructor(private db: AngularFirestore) {

  }
  ngOnInit() {
    this.db.collection('trades').valueChanges().subscribe(trades => {
      this.trades = trades;
      console.log(trades);
    });
  }

  addTrade(){
    const rc = this.db.collection('trades');
    rc.add({
      coinName: this.CnameI.toUpperCase(),
      priceusd: this.CPriceI,
      investedInUSD: this.CInvestedMoneyI,
      quantity: this.CQuantI,
      date: this.CDateI,
    });
  }
  deleteRecord(coinName: string, quantity: string, date: string, priceusd: string) {
    this.db.collection('trades', ref => ref
      .where('coinName', '==', coinName)
      .where('quantity', '==', quantity)
      .where('date', '==', date)
      .where('priceusd', '==', priceusd)
    ).get().toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
  }

}



