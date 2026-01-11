import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RideResponse} from '../../core/models/ride';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-ride-card',
  imports: [
    DatePipe
  ],
  templateUrl: './ride-card.html',
  styleUrl: './ride-card.css',
})
export class RideCard {
  @Input({ required: true }) ride!: RideResponse;
  @Input() showLeaveButton = false;
  @Output() leave = new EventEmitter<number>();
}
