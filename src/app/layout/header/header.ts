import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
