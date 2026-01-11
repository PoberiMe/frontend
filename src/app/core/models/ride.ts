export interface Location {
  lat: number;
  lng: number;
}

export interface RideRequest {
  startLocation: Location;
  endLocation: Location;
  startName: string;
  endName: string;
  rideTime: string;
  passengerIds: number[];
  driverId: number;
  capacity: number;
}

export interface RideResponse {
  id: number;
  driverId: number;
  startLocation: Location;
  endLocation: Location;
  rideTime: string;
  passengerIds: number[];
  startName: string;
  endName: string;
  capacity: number;
}
