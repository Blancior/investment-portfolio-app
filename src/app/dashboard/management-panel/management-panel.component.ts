import {Component} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { MatDialog} from "@angular/material/dialog";
import {TradeDialogComponent} from "../../trade/trade-dialog/trade-dialog.component";
import {FormBuilder, Validators} from "@angular/forms";
import {TradeService} from "../../services/trade.service";

@Component({
  selector: 'management-panel',
  templateUrl: 'management-panel.component.html',
  styleUrls: ['./management-panel.component.scss', '../main/main.component.scss']
})
export class ManagementPanelComponent{

  CDateI:string = new Date().toISOString().slice(0,19);
  coinNames1: string[] = [
    'bitcoin', 'ethereum', 'ripple', 'dogecoin', 'cardano', 'binancecoin', 'solana', 'polkadot', 'litecoin', 'tron', 'shiba-inu', 'dai', 'uniswap', 'chainlink', 'wrapped-bitcoin',
    'cosmos', 'monero', 'algorand', 'lido-dao', 'ethereum-classic', 'okb', 'bitcoin-cash', 'stellar', 'filecoin', 'aptos', 'cronos', 'near', 'vechain', 'apecoin', 'internet-computer',
    'algorand', 'eos', 'the-graph', 'fantom', 'decentraland', 'bitdao', 'aave', 'flow', 'tezos', 'axie-infinity', 'the-sandbox', 'maker', 'neo', 'chiliz', 'huobi-token', 'optimism',
    'dash', 'cake', 'iota', 'gmx', 'zilliqa', '1inch', 'osmosis', 'floki', 'dydx', 'woo-network', 'link', 'gala', 'lisk'
  ]; //temp
  form1 = this.formbuilder.group({
    coinName: ['', {validators: [Validators.required]}],
    quantity: ['', {validators: [Validators.required]}],
    investedInUSD: ['', {validators: [Validators.required]}],
    date: [this.CDateI, {validators: [Validators.required]}],
  })

  constructor(
    private db: AngularFirestore,
    private dialog: MatDialog,
    private formbuilder: FormBuilder,
    public tradeService: TradeService
  ) {
    this.CDateI= new Date().toISOString().slice(0,19);
  }

  addTrade(){
    this.CDateI= new Date().toISOString().slice(0,19);
    const rc = this.db.collection('trades');
    rc.add(this.form1.value);
    this.form1.reset();
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
}
