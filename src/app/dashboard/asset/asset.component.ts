import {Component, OnInit} from '@angular/core';
import {DashboardComponent} from "../dashboard.component";
import axios from "axios";

@Component({
selector: 'asset',
templateUrl: './asset.component.html',
styleUrls: ['./asset.component.scss']

})
export class AssetComponent implements OnInit{
  apikey= '4697a2f8-01cf-4bd3-9d0b-29f3a4d1b835';
  selectedCrypto;
  cryptoPrice :any;
  ngOnInit() {
    }
    constructor(public dashboard: DashboardComponent) {
    }
  selectedCryptoPrice;
  onSubmit = async () => {
       axios.get('https://api.coingecko.com/api/v3/coins/markets', {
         params: {
           vs_currency: 'usd',
           ids: this.selectedCrypto.toString()
         }
       }).then(response => {
           console.log(response.data[0].current_price);
           this.selectedCryptoPrice=response.data[0].current_price;
           document.getElementById("ind1").style.visibility='visible';
         }).catch(error => {
           console.error(error);
         });
     }

}
