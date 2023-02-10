import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent implements OnInit{
  trades: any[];
  constructor(private db: AngularFirestore) { }

ngOnInit() {
     this.db.collection('trades').valueChanges().subscribe(trades => {
     this.trades=trades;
      console.log(trades);
     });

}

}
