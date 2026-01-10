import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RideRequest, RideResponse} from '../models/ride';

@Injectable({
  providedIn: 'root'
})
export class Ride {
  private apiUrl = 'http://localhost:8083/rides';

  constructor(private http: HttpClient) {}

  createRide(rideRequest: RideRequest) {
    return this.http.post<RideResponse>(this.apiUrl, rideRequest);
  }

  getRidesCreatedByDriver(driverId: number) {
    return this.http.get<[RideResponse]>(`${this.apiUrl}/drivers/${driverId}`);
  }
}
