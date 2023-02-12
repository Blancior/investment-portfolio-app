import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  trades: any[];
  przyklad:string;
  constructor(private db: AngularFirestore) { }


  ngOnInit() {
    this.db.collection('trades').valueChanges().subscribe(trades => {
      this.trades = trades;
      console.log(trades);
    });
  }
}
