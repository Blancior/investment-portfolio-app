import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { MatDialog} from "@angular/material/dialog";
import {TradeDialogComponent} from "../../trade/trade-dialog/trade-dialog.component";
import {FormBuilder, Validators} from "@angular/forms";
import {TradeService} from "../../services/trade.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AssetService} from "../../services/asset.service";
import {AssetModel} from "../../models/asset-model";

@Component({
  selector: 'management-panel',
  templateUrl: 'management-panel.component.html',
  styleUrls: ['./management-panel.component.scss', '../main/main.component.scss']
})
export class ManagementPanelComponent implements OnInit{

  CDateI:string = new Date().toISOString().slice(0,19);
  coinNames!: AssetModel[]
  form1 = this.formbuilder.group({
    coinName: ['', {validators: [Validators.required]}],
    quantity: ['', {validators: [Validators.required]}],
    investedInUSD: ['', {validators: [Validators.required]}],
    date: [this.CDateI, {validators: [Validators.required]}],
  })

  constructor(
    private db: AngularFirestore,
    private dialog: MatDialog,
    private formbuilder: FormBuilder,
    public tradeService: TradeService,
    private assetService: AssetService,
    private sb: MatSnackBar
  ) {
    this.CDateI= new Date().toISOString().slice(0,19);
  }

  ngOnInit(): void {
    this.assetService.getTop200CryptoNames().subscribe(res=>{
      this.coinNames = res;
    })
  }

  addTrade(){
    if (this.form1.valid){
      this.CDateI= new Date().toISOString().slice(0,19);
      const rc = this.db.collection('trades');
      rc.add(this.form1.value).then(()=>{
        this.sb.open('Trade has been succesfully added to your portfolio!','',{
          duration: 3000,
          panelClass: ['success-snackBar']
        })
      }).catch(()=>{
        this.sb.open('An error has occured.','',{
          duration: 3000,
          panelClass: ['failure-snackBar']
        })
      });
      this.form1.reset();
    }
  }
  deleteRecord(coinName: string, quantity: number, date: string) {
    this.db.collection('trades', ref => ref
      .where('coinName', '==', coinName)
      .where('quantity', '==', quantity)
      .where('date', '==', date)
    ).get().toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
    this.dialog.closeAll();
  }

  goToDelete(trade: any){
    this.dialog.open(TradeDialogComponent,{data: trade});
  }
}
