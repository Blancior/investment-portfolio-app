import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'analyse-panel',
  templateUrl: 'analyse-panel.component.html',
  styleUrls: ['./analyse-panel.component.scss', '../main/main.component.scss']
})
export class AnalysePanelComponent implements OnInit {

  trades:any[];
  constructor(private db: AngularFirestore) { }
  ngOnInit() {
    this.db.collection('trades').valueChanges().subscribe(trades => {
      this.trades = trades;
      console.log(trades);
    });
    }
  }

