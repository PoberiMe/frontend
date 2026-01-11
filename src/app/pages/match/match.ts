import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import {Route} from '../../core/services/route';
import {MatchRequest, RouteResponse} from '../../core/models/route';
import {RideCard} from '../../shared/ride-card/ride-card';
import {RouteCard} from '../../shared/route-card/route-card';
import {Ride} from '../../core/services/ride';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-match',
  imports: [FormsModule, GoogleMapsModule, RideCard, RouteCard],
  templateUrl: './match.html',
  styleUrls: ['./match.css'],
})
export class Match implements AfterViewInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private routeService: Route,
    private rideService: Ride,
    private authService: AuthService,
  ) {}

  center: google.maps.LatLngLiteral = { lat: 46.049235, lng: 14.511132 }; // defaulta na LJ
  zoom = 12;

  fromMarkerSet = false;
  toMarkerSet = false;
  fromMarker: google.maps.LatLngLiteral = { lat: 46.049235, lng: 14.511132 };
  toMarker: google.maps.LatLngLiteral = { lat: 46.055, lng: 14.52 };

  @ViewChild('fromInput', { static: true }) fromInput!: ElementRef<HTMLInputElement>;
  @ViewChild('toInput', { static: true }) toInput!: ElementRef<HTMLInputElement>;

  fromAutocomplete!: google.maps.places.Autocomplete;
  toAutocomplete!: google.maps.places.Autocomplete;

  ngAfterViewInit() {
    this.fromAutocomplete = new google.maps.places.Autocomplete(this.fromInput.nativeElement);
    this.toAutocomplete = new google.maps.places.Autocomplete(this.toInput.nativeElement);

    this.fromAutocomplete.addListener('place_changed', () => {
      const place = this.fromAutocomplete.getPlace();
      console.log(place);
      if (place.geometry?.location) {
        this.center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        this.fromMarker = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
        this.fromMarkerSet = true;

        this.cdr.detectChanges();
        this.updateViewport();
      }
    });

    this.toAutocomplete.addListener('place_changed', () => {
      const place = this.toAutocomplete.getPlace();
      if (place.geometry?.location) {
        this.center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        this.toMarker = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
        this.toMarkerSet = true;
        this.cdr.detectChanges();
        this.updateViewport();
      }
    });
  }

  private updateViewport() {
    if (!this.fromMarkerSet || !this.toMarkerSet) return;

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(this.fromMarker);
    bounds.extend(this.toMarker);

    // Center is the bounds center
    this.center = {
      lat: bounds.getCenter().lat(),
      lng: bounds.getCenter().lng(),
    };

    const latDiff = Math.abs(this.fromMarker.lat - this.toMarker.lat);
    const lngDiff = Math.abs(this.fromMarker.lng - this.toMarker.lng);
    const maxDiff = Math.max(latDiff, lngDiff);

    // Rough zoom approximation (you can tweak the factor)
    this.zoom = maxDiff < 0.01 ? 14 :
      maxDiff < 0.05 ? 12 :
        maxDiff < 0.2  ? 10 : 8;

    this.cdr.detectChanges();
  }

  startTime = '';
  radius = 500;
  matchedRoutes: RouteResponse[] = [];

  searchRides() {
    if (!this.fromMarkerSet || !this.toMarkerSet || !this.startTime) {
      alert('Please fill all fields');
      return;
    }

    const base = new Date(this.startTime);
    const matchRequest: MatchRequest = {
      startLocation: this.fromMarker,
      endLocation: this.toMarker,
      startTime: new Date(base.getTime() - 16 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(base.getTime() + 16 * 60 * 60 * 1000).toISOString(),
      radius: this.radius,
    };

    this.routeService.matchRoutes(matchRequest).subscribe({
      next: (routes) => {
        console.log('Matched routes:', routes);
        this.matchedRoutes = routes;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  successMessage = '';
  requestJoinRoute(rideId: number) {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.warn('User is not logged in');
      return;
    }


    this.rideService.joinRide(rideId, userId).subscribe({
      next: (response: any) => {
        console.log('Join successful', response);

        // Show temporary success message
        this.successMessage = `You have successfully joined the ride`;
        this.cdr.detectChanges();

        // Clear message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
          this.cdr.detectChanges();
        }, 3000);
      },
      error: (err) => {
        console.error(err);
      }
    });


  }
}
