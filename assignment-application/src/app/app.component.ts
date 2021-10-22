import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  simpleOptions = ["One", "Two", "Three"];
  listOfValues : string[] = [];
  previousLocations: string[] = ["warangal", "hyderabad"];

  //
  myControl: FormControl = new FormControl();
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((val: string) => this.filter(val))
      );
  }

  filter(val: string): string[] {
    return this.previousLocations.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  //
  
  public addData() {
    let val = this.myControl.value;
    let tempList = val.split(',');
    tempList.forEach((element: string) => {
      if (!this.listOfValues.includes(element)) {
        this.listOfValues.push(element);
      }
    });
    tempList.forEach((element: string) => {
      if(!this.previousLocations.includes(element)) {
        this.previousLocations.push(element);
      }
    });
    this.resetForm();
  }
  public resetForm() {
    this.myControl.setValue('');
  }
  public removeData(item: string){
    this.listOfValues.forEach((element, index) => {
      if(item===element) {
        this.listOfValues.splice(index,1);
      }
    });
  }
}

