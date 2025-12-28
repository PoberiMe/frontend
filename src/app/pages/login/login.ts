import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  identifier = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.identifier, this.password)
      .subscribe({
        next: (token) => {
          localStorage.setItem('jwt', token);
          console.log('Logged in! Token saved');
          this.router.navigate(['/match']);
        },
        error: (err) => console.error('Error:', err)
      });
  }
}
