import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {TradeModel} from "../../models/trade-model";
import { MatDialog} from "@angular/material/dialog";
import {DashboardComponent} from "../dashboard.component";
import {TradeDialogComponent} from "../../trade/trade-dialog/trade-dialog.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  form1: FormGroup;
  constructor(
    private db: AngularFirestore,
    private dialog: MatDialog,
    public dashboard: DashboardComponent,
    private formbuilder: FormBuilder
  ) {
    this.dashboard.getTrades();
    this.db.collection<TradeModel>('trades').get().subscribe(() => {
      // const names: any[] = querySnapshot.docs.map(doc => doc.data().coinName);
      this.dashboard.getCurrentPrices();
    });
    this.dashboard.sumInvestedMoney();
  }

  ngOnInit(): void {
    this.buildForm();
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
    this.dialog.closeAll();
  }
  goToDelete(trade: any){
    this.dialog.open(TradeDialogComponent,{data: trade});
  }
  private buildForm(){
    this.form1 = this.formbuilder.group({
      name: ['', {validators: [Validators.required]}],
      amount: ['', {validators: [Validators.required]}],
      invested: ['', {validators: [Validators.required]}],
    })
  }

}
