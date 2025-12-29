import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import {Ride} from '../../core/services/ride';
import {AuthService} from '../../core/services/auth.service';
import {RideRequest, RideResponse} from '../../core/models/ride';

@Component({
  selector: 'app-drive',
  imports: [FormsModule, GoogleMapsModule],
  templateUrl: './drive.html',
  styleUrls: ['./drive.css'],
})
export class Drive implements AfterViewInit {

  constructor(
    private cdr: ChangeDetectorRef,
    private rideService: Ride,
    private authService: AuthService,
  ) {}

  center: google.maps.LatLngLiteral = { lat: 46.049235, lng: 14.511132 }; // Ljubljana
  zoom = 12;

  fromMarkerSet = false;
  toMarkerSet = false;

  fromMarker!: google.maps.LatLngLiteral;
  toMarker!: google.maps.LatLngLiteral;

  rideTime = '';

  @ViewChild('fromInput', { static: true }) fromInput!: ElementRef<HTMLInputElement>;
  @ViewChild('toInput', { static: true }) toInput!: ElementRef<HTMLInputElement>;

  fromAutocomplete!: google.maps.places.Autocomplete;
  toAutocomplete!: google.maps.places.Autocomplete;

  ngAfterViewInit() {
    this.fromAutocomplete = new google.maps.places.Autocomplete(this.fromInput.nativeElement);
    this.toAutocomplete = new google.maps.places.Autocomplete(this.toInput.nativeElement);

    this.fromAutocomplete.addListener('place_changed', () => {
      const place = this.fromAutocomplete.getPlace();
      if (!place.geometry?.location) return;

      this.fromMarker = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      this.fromMarkerSet = true;

      this.updateViewport();
    });

    this.toAutocomplete.addListener('place_changed', () => {
      const place = this.toAutocomplete.getPlace();
      if (!place.geometry?.location) return;

      this.toMarker = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      this.toMarkerSet = true;

      this.updateViewport();
    });
  }

  private updateViewport() {
    if (!this.fromMarkerSet && !this.toMarkerSet) return;

    if (this.fromMarkerSet && !this.toMarkerSet) {
      this.center = this.fromMarker;
      this.zoom = 13;
    }

    if (this.fromMarkerSet && this.toMarkerSet) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(this.fromMarker);
      bounds.extend(this.toMarker);

      this.center = {
        lat: bounds.getCenter().lat(),
        lng: bounds.getCenter().lng(),
      };

      const latDiff = Math.abs(this.fromMarker.lat - this.toMarker.lat);
      const lngDiff = Math.abs(this.fromMarker.lng - this.toMarker.lng);
      const maxDiff = Math.max(latDiff, lngDiff);

      this.zoom =
        maxDiff < 0.01 ? 14 :
          maxDiff < 0.05 ? 12 :
            maxDiff < 0.2  ? 10 : 8;
    }

    this.cdr.detectChanges();
  }



  createRide() {
    if (!this.fromMarkerSet || !this.toMarkerSet || !this.rideTime) {
      alert("All fields are mandatory.");
      return;
    }


    const rideRequest: RideRequest = {
      startLocation: this.fromMarker,
      endLocation: this.toMarker,
      rideTime: this.rideTime,
      passengerIds: [],
      driverId: this.authService.getUserId()!
    };

    this.rideService.createRide(rideRequest).subscribe({
      next: (response: RideResponse) => console.log('Ride created:', response),
      error: (err: any) => console.error('Error:', err)
    });
  }


}
