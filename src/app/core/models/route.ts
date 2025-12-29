export interface Location {
  lat: number;
  lng: number;
}

export interface MatchRequest {
  startLocation: Location;
  endLocation: Location;
  startTime: string;
  endTime: string;
  radius: number;
}

export interface RouteResponse {
  id: number;
  startLocation: Location;
  endLocation: Location;
  startTime: string;
  rideId: number;
}
