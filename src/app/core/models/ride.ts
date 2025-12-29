export interface Location {
  lat: number;
  lng: number;
}

export interface RideRequest {
  startLocation: Location;
  endLocation: Location;
  rideTime: string;
  passengerIds: number[];
  driverId: number;
}

export interface RideResponse {
  id: number;
  driverId: number;
  startLocation: Location;
  endLocation: Location;
  rideTime: string;
  passengerIds: number[];
}
