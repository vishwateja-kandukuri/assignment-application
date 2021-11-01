import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { LocationInfo } from './model/LocationInfoDTO';

@Injectable({
  providedIn: 'root'
})
export class LocationDataService {

  constructor(protected http: HttpClient) { }

  public saveLocation(locationInput: string) : Observable<HttpResponse<any>> {
    let url = 'http://localhost:8080/saveLocation';
    let locationInfo = new LocationInfo();
    locationInfo.locationInput=locationInput;
    return this.http.post<any>(url,locationInfo).pipe();
  }

  public getAllPreviousLocations() {
    let url = 'http://localhost:8080/readAll'
    return this.http.get<any>(url).pipe();
  }

  getLocationsFromAPI(val: string) {
    let url = 'https://geocode.search.hereapi.com/v1/geocode?q='+val+'&apiKey=';
    return this.http.get<any>(url);
  }

}
