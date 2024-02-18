import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ApiOverheatDialogComponent} from "../api-overheat-dialog/api-overheat-dialog.component";
import {catchError, map, of} from "rxjs";
import {AssetService} from "../../services/asset.service";
import {AssetModel} from "../../models/asset-model";

@Component({
selector: 'asset',
templateUrl: './asset.component.html',
styleUrls: ['./asset.component.scss']

})
export class AssetComponent implements OnInit{
  selectedCrypto:string='';
  displayedRN:string = 'bitcoin';
  cryptoPrice: any;
  coinImage!:string;
  date: any;
  coins!: AssetModel[];
  priceChange24h!:number;
  marketCap:string;
  athPrice:string;
  selectedCryptoPrice=0;

  constructor(private dialog: MatDialog,
              private as: AssetService) {
  }

  ngOnInit(): void {
    this.as.getTop200CryptoNames().pipe(
      catchError(error => {
        this.dialog.open(ApiOverheatDialogComponent, { disableClose: false });
        return of(null);
      })
    ).subscribe(res=>{
      this.coins = res;
    })

  }


  onSubmit = () => {
         if (this.selectedCrypto!= ''){
           this.as.getSelectedCryptoInfo(this.selectedCrypto).pipe(
             map((res: any) => {
               console.log(res);
               return res;
             }),
             catchError(error => {
               this.dialog.open(ApiOverheatDialogComponent, { disableClose: false });
               return of(null);
             })
           ).subscribe((res) => {
               this.selectedCryptoPrice = res[0].current_price;
               this.displayedRN = res[0].name;
               this.coinImage = res[0].image;
               this.marketCap = (res[0].market_cap).toLocaleString();
               this.priceChange24h = (res[0].price_change_percentage_24h);
               this.athPrice = (res[0].ath).toString().substring(0,3);
               document.getElementById("ind2").style.visibility = 'visible';
               this.date = new Date();
           });
         }
     }


  protected readonly Number = Number;
}
