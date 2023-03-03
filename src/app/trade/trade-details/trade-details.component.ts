import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TradeModel} from "../../models/trade-model";

@Component({
  selector: 'app-trade-details',
  templateUrl: './trade-details.component.html',
  styleUrls: ['./trade-details.component.scss']
})

export class TradeDetailsComponent {
trade: TradeModel;
  constructor(
    private dialogRef: MatDialogRef<TradeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TradeModel
  )
  {
    this.trade=data;
  }
  close(){
    this.dialogRef.close();
  }
}
