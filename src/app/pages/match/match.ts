import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [FormsModule, GoogleMapsModule],
  templateUrl: './match.html',
  styleUrls: ['./match.css'],
})
export class Match implements AfterViewInit {
  center: google.maps.LatLngLiteral = { lat: 46.049235, lng: 14.511132 };
  zoom = 12;

  @ViewChild('fromInput', { static: true }) fromInput!: ElementRef<HTMLInputElement>;
  @ViewChild('toInput', { static: true }) toInput!: ElementRef<HTMLInputElement>;

  fromAutocomplete!: google.maps.places.Autocomplete;
  toAutocomplete!: google.maps.places.Autocomplete;

  ngAfterViewInit() {
    this.fromAutocomplete = new google.maps.places.Autocomplete(this.fromInput.nativeElement);
    this.toAutocomplete = new google.maps.places.Autocomplete(this.toInput.nativeElement);

    this.fromAutocomplete.addListener('place_changed', () => {
      const place = this.fromAutocomplete.getPlace();
      if (place.geometry?.location) {
        this.center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
      }
    });

    this.toAutocomplete.addListener('place_changed', () => {
      const place = this.toAutocomplete.getPlace();
      if (place.geometry?.location) {
        this.center = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
      }
    });
  }
}
