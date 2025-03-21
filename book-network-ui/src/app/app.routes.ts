import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ActiveAccountComponent} from './pages/active-account/active-account.component';

export const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path: 'activate-account',
    component: ActiveAccountComponent
  },
  {
    path:'**',
    redirectTo:'login'
  }
];
