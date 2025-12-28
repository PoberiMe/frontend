import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    // TODO CHECK THAT MATCHING passwords
    this.authService.register(this.username, this.email, this.password)
      .subscribe({
        next: (response) => {
          console.log('Registered!', response);
        },
        error: (err) => console.error('Error:', err)
      });
  }
}
