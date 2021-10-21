import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  openlist() {
    this.trigger.openMenu();
  }
  @ViewChild("placesRef") placesRef! : GooglePlaceDirective;
  fieldValue: any;
  listOfValues : string[] = []
  ngAfterViewInit() {
    this.placesRef.options.componentRestrictions = { country: 'SG' }
    this.placesRef.options.fields = ["formatted_address", "geometry", "place_id"]
  }
  public handleAddressChange(address: Address) {
    // Do some stuff
  }
  public addData() {
    let tempList = this.fieldValue.split(',');
    tempList.forEach((element: string) => {
      if(!this.listOfValues.includes(element)){
        this.listOfValues.push(element);
      }
    });
    this.fieldValue='';
  }
  public removeData(item: string){
    this.listOfValues.forEach((element, index) => {
      if(item===element) {
        this.listOfValues.splice(index,1);
      }
    });
  }
}

