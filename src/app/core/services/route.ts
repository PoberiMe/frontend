import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatchRequest, RouteResponse} from '../models/route';

@Injectable({
  providedIn: 'root'
})
export class Route {
  private apiUrl = 'http://localhost:8082/routes';

  constructor(private http: HttpClient) {}

  matchRoutes(matchRequest: MatchRequest) {
    return this.http.post<RouteResponse[]>(`${this.apiUrl}/match`, matchRequest);
  }

  requestJoin(routeId: number) {
    console.log("requestJoin", routeId);
    return null;
  }
}
