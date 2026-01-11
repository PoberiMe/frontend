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
  
  constructor(
    private rideService: Ride,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  joinedRides: RideResponse[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;

  ngOnInit() {
    this.loadPage(0);
  }

  loadPage(page: number) {
    const userId = this.authService.getUserId();
    if (!userId) return;

    this.rideService.getRidesAsPassenger(userId, page, this.pageSize).subscribe({
      next: response => {
        this.joinedRides = response.content;
        this.currentPage = response.number;
        this.totalPages = response.totalPages;
        this.cdr.detectChanges();
      },
      error: err => console.error('Failed to load joined rides:', err)
    });
  }

  leaveRide(rideId: number) {
    const userId = this.authService.getUserId()!;
    this.rideService.leaveRide(rideId, userId).subscribe({
      next: () => {
        this.loadPage(this.currentPage); // Reload current page
      }
    });
  }
}
