import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError, startWith } from 'rxjs/operators';
import { LocationDataService } from './location-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private locationDataService: LocationDataService){}

  listOfValues : string[] = [];
  previousLocations: string[] = [];

  myControl: FormControl = new FormControl();
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.locationDataService.getAllPreviousLocations().subscribe((data) => {
      this.previousLocations = ["Hyderabad","Warangal","Karimnagar"];
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((val: string) => this.filter(val))
      );
  }

  filter(val: string): string[] {
    if(this.myControl.dirty){
      return this.getSearchSuggestions(val);
    } else {
      return this.previousLocations.filter(option =>
        option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
  }

  getSearchSuggestions(val: string): string[] {
    let apiResultList: string[]=[];
    this.locationDataService.getLocationsFromAPI(val).subscribe((data)=>{
      if(data.items){
        data.items.forEach((element: any) => {
          apiResultList.push(element.title);
        });
      }
    });
    return apiResultList;
  }
  
  public addData() {
    let val = this.myControl.value;
    if (/\S/.test(val)) {
      val = val.split(',')[0];
      if (!this.listOfValues.includes(val)) {
        this.listOfValues.push(val);
      }
    }
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

