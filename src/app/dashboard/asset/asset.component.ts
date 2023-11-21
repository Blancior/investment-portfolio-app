import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ApiOverheatDialogComponent} from "../api-overheat-dialog/api-overheat-dialog.component";
import {TradeService} from "../../services/trade.service";
import {catchError, map, of} from "rxjs";

@Component({
selector: 'asset',
templateUrl: './asset.component.html',
styleUrls: ['./asset.component.scss']

})
export class AssetComponent{
  selectedCrypto:string='';
  displayedRN:string = 'bitcoin';
  cryptoPrice: any;
  coinImage!:string;
  date: any;
  coinNames1: string[] = [
    'bitcoin', 'ethereum', 'ripple', 'dogecoin', 'cardano', 'binancecoin', 'solana', 'polkadot', 'litecoin', 'tron', 'shiba-inu', 'dai', 'uniswap', 'chainlink', 'wrapped-bitcoin',
    'cosmos', 'monero', 'algorand', 'lido-dao', 'ethereum-classic', 'okb', 'bitcoin-cash', 'stellar', 'filecoin', 'aptos', 'cronos', 'near', 'vechain', 'apecoin', 'internet-computer',
    'algorand', 'eos', 'the-graph', 'fantom', 'decentraland', 'bitdao', 'aave', 'flow', 'tezos', 'axie-infinity', 'the-sandbox', 'maker', 'neo', 'chiliz', 'huobi-token', 'optimism',
    'dash', 'cake', 'iota', 'gmx', 'zilliqa', '1inch', 'osmosis', 'floki', 'dydx', 'woo-network', 'link', 'gala', 'lisk'
  ]; //temp
  selectedCryptoPrice=0;

  constructor(private dialog: MatDialog,
              private ts: TradeService) {
  }


  onSubmit = () => {
         if (this.selectedCrypto!= ''){
           this.ts.getSelectedCryptoInfo(this.selectedCrypto).pipe(
             map((res: any) => {
               console.log(res);
               return res;
             }),
             catchError(error => {
               this.dialog.open(ApiOverheatDialogComponent, { disableClose: false });
               console.error(error);
               return of(null);
             })
           ).subscribe((res) => {
               this.selectedCryptoPrice = res[0].current_price;
               this.displayedRN = res[0].name;
               this.coinImage = res[0].image;
               document.getElementById("ind2").style.visibility = 'visible';
               this.date = new Date();
           });
         }
     }


}
