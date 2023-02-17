import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'management-panel',
  templateUrl: 'management-panel.component.html',
  styleUrls: ['./management-panel.component.scss', '../main/main.component.scss']
})
export class ManagementPanelComponent implements OnInit {
    trades:any[];
    CnameI:string;
    CQuantI:number;
    CPriceI:number;
    CDateI:string = new Date().toDateString();
    constructor(private db: AngularFirestore) { }
  // s

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
        priceusd: this.CPriceI.toString(),
        quantity: this.CQuantI.toString(),
        date: this.CDateI.toString(),
      });
  }
  }


