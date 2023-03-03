import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {TradeModel} from "../../models/trade-model";
import { MatDialog} from "@angular/material/dialog";
import {TradeDetailsComponent} from "../../trade/trade-details/trade-details.component";
import {DashboardComponent} from "../dashboard.component";

@Component({
  selector: 'management-panel',
  templateUrl: 'management-panel.component.html',
  styleUrls: ['./management-panel.component.scss', '../main/main.component.scss']
})
export class ManagementPanelComponent implements OnInit{

  CnameI:string;
  CQuantI:number;
  CInvestedMoneyI:number;
  CDateI:string = new Date().toISOString().slice(0,19);
  constructor(
    private db: AngularFirestore,
    private dialog: MatDialog,
    public parent: DashboardComponent,
  ) {
    this.parent.getTrades();
    this.db.collection<TradeModel>('trades').get().subscribe(querySnapshot => {
      const names: any[] = querySnapshot.docs.map(doc => doc.data().coinName);
      console.log(names.join(','));
      this.parent.getCurrentPrices();
    });
    this.parent.sumInvestedMoney();
  }
  ngOnInit() {
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
  goToEdit(trade: any){
    this.dialog.open(TradeDetailsComponent,{data: trade});
  }
}
