import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RideResponse} from '../../core/models/ride';
import {Ride} from '../../core/services/ride';
import {AuthService} from '../../core/services/auth.service';
import {RideCard} from '../../shared/ride-card/ride-card';

@Component({
  selector: 'app-profile',
  imports: [
    RideCard
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  joinedRides: RideResponse[] = [];

  constructor(
    private rideService: Ride,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (!userId) return;

    this.rideService.getRidesAsPassenger(userId).subscribe({
      next: rides => {
        console.log('Joined rides response:', rides);
        this.joinedRides = rides;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Failed to load joined rides:', err);
      }
    });
  }

  leaveRide(rideId: number) {
    const userId = this.authService.getUserId()!;
    this.rideService.leaveRide(rideId, userId).subscribe({
      next: () => {
        this.joinedRides = this.joinedRides.filter(r => r.id !== rideId);
        this.cdr.detectChanges();
      }
    });
  }
}
