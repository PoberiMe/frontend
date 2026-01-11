import { Routes } from '@angular/router';
import {Login} from './pages/login/login';
import {Register} from './pages/register/register';
import {Match} from './pages/match/match';
import {Drive} from './pages/drive/drive';
import {AuthGuard} from './core/guards/auth';
import {Profile} from './pages/profile/profile';

export const routes: Routes = [
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: Profile
  },
  {
    path: '',
    redirectTo: 'match',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'match',
    canActivate: [AuthGuard],
    component: Match
  },
  {
    path: 'drive',
    canActivate: [AuthGuard],
    component: Drive
  },
];
