import {Component} from '@angular/core';
import axios from "axios";

@Component({
selector: 'asset',
templateUrl: './asset.component.html',
styleUrls: ['./asset.component.scss']

})
export class AssetComponent{
  selectedCrypto:string;
  displayedRN:string='bitcoin';
  cryptoPrice :any;
  date: any;
  coinNames1: string[] = [
    'bitcoin', 'ethereum', 'ripple', 'dogecoin', 'cardano', 'binancecoin', 'solana', 'polkadot', 'litecoin', 'tron', 'shiba-inu', 'dai', 'uniswap', 'chainlink', 'wrapped-bitcoin',
    'cosmos', 'monero', 'algorand', 'lido-dao', 'ethereum-classic', 'okb', 'bitcoin-cash', 'stellar', 'filecoin', 'aptos', 'cronos', 'near', 'vechain', 'apecoin', 'internet-computer',
    'algorand', 'eos', 'the-graph', 'fantom', 'decentraland', 'bitdao', 'aave', 'flow', 'tezos', 'axie-infinity', 'the-sandbox', 'maker', 'neo', 'chiliz', 'huobi-token', 'optimism',
    'dash', 'cake', 'iota', 'gmx', 'zilliqa', '1inch', 'osmosis', 'floki', 'dydx', 'woo-network', 'link', 'gala', 'lisk'
  ]; //temp
  selectedCryptoPrice=0;
  onSubmit = () => {
       axios.get('https://api.coingecko.com/api/v3/coins/markets', {
         params: {
           vs_currency: 'usd',
           ids: this.selectedCrypto
         }
       }).then(response => {
           this.selectedCryptoPrice=response.data[0].current_price;
           if (this.selectedCryptoPrice.toString().length>5)
             Math.round(this.selectedCryptoPrice);
           this.displayedRN=this.selectedCrypto.toUpperCase();
           document.getElementById("ind2").style.visibility='visible';
           this.date = new Date();
         }).catch(error => {
           console.error(error);
         });
     }

}
