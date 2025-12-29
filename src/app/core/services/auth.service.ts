import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  sub: string; // userId
  username: string;
  iat: number;
  exp: number;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/auth';

  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      username,
      email,
      password,
    });
  }

  login(identifier: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { identifier, password }, {
      responseType: 'text'
    });
  }

  getCurrentUser(): JwtPayload | null {
    const token = localStorage.getItem('jwt');
    if (!token) return null;

    return jwtDecode<JwtPayload>(token);
  }

  getUserId(): number | null {
    const user = this.getCurrentUser();
    return user?.sub ? Number(user.sub) : null;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt');
    if (!token) return false;

    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.exp * 1000 > Date.now();
  }

  logout(): void {
    localStorage.removeItem('jwt');
  }
}
