import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ActiveAccountComponent} from './pages/active-account/active-account.component';
import {MenuComponent} from './pages/menu/menu.component';
import {BookListComponent} from './pages/book-list/book-list.component';

export const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'books',
        component: BookListComponent,
        title:'Book List'
      },
      {
        path: 'my-waiting-list',
        component: BookListComponent,
        title:'My Waiting List'
      },
      {
        path: 'my-returned-books',
        component: BookListComponent,
        title:'My Returned Books'
      },
      {
        path: 'my-borrowed-books',
        component: BookListComponent,
        title:'My Borrowed Books'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'activate-account',
    component: ActiveAccountComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
