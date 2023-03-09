import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TradeModel} from "../../models/trade-model";
import {ManagementPanelComponent} from "../../dashboard/management-panel/management-panel.component";

@Component({
  selector: 'app-trade-dialog',
  templateUrl: './trade-dialog.component.html',
  styleUrls: ['./trade-dialog.component.scss']
})
export class TradeDialogComponent {
  trade: TradeModel;
  constructor(
    public management: ManagementPanelComponent,
    private dialogRef: MatDialogRef<TradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TradeModel
  )
  {
    this.trade=data;
  }
  close(){
    this.dialogRef.close();
  }
}
