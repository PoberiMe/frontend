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

  getRidesCreatedByDriver(driverId: number, page: number = 0, size: number = 10) {
    return this.http.get<any>(`${this.apiUrl}/drivers/${driverId}?page=${page}&size=${size}`);
  }

  joinRide(rideId: number, passengerId: number) {
    return this.http.patch<RideResponse>(
      `${this.apiUrl}/${rideId}/passengers/${passengerId}`,
      null
    );
  }

  getRidesAsPassenger(userId: number, page: number = 0, size: number = 10) {
    return this.http.get<any>(`${this.apiUrl}?passengerId=${userId}&page=${page}&size=${size}`);
  }

  leaveRide(rideId: number, passengerId: number) {
    return this.http.patch<RideResponse>(
      `${this.apiUrl}/${rideId}/passengers/${passengerId}/remove`,
      {}
    );
  }
}
