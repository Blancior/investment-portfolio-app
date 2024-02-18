import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient) { }

  getSelectedCryptoInfo(selectedCrypto: string): Observable<any> {
    return this.http.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: selectedCrypto
      }
    });
  }

  getTop200CryptoNames():Observable<any>{
    return this.http.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1')
      .pipe(
        map((response: any[]) => response.map((coin: any) => ({ id: coin.id, name: coin.name })))
      )
  }
}
