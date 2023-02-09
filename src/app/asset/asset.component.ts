import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
selector: 'asset',
templateUrl: './asset.component.html',
styleUrls: ['./asset.component.scss']

})
export class AssetComponent implements OnInit{
  apikey= '4697a2f8-01cf-4bd3-9d0b-29f3a4d1b835';
  selectedCrypto = '';
  cryptoPrice :any;
  searchForm : FormGroup;
  ngOnInit() {
      this.searchForm = new FormGroup({
        assetName: new FormControl(null)
      });
    }
  selectedCrypto1;
  onSubmit(){
    console.log(this.searchForm.value.assetName);
  }
}
