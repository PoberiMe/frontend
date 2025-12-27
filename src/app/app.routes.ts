import { Routes } from '@angular/router';
import {Login} from './pages/login/login';
import {Register} from './pages/register/register';
import {Match} from './pages/match/match';
import {Drive} from './pages/drive/drive';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'match', component: Match },
  { path: 'drive', component: Drive },
];
