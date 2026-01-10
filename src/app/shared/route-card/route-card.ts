import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouteResponse} from '../../core/models/route';
import {DatePipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-route-card',
  imports: [
    DatePipe
  ],
  templateUrl: './route-card.html',
  styleUrl: './route-card.css',
})

export class RouteCard {
  @Input() route!: RouteResponse;
  @Output() join = new EventEmitter<number>();

  requestJoin() {
    this.join.emit(this.route.id);
  }
}
