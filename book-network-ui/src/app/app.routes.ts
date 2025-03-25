import { authGuard } from './auth.guard';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActiveAccountComponent } from './pages/active-account/active-account.component';
import { MenuComponent } from './pages/menu/menu.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { ManageBookComponent } from './pages/manage-book/manage-book.component';
import { NonFoundComponent } from './pages/non-found/non-found.component';

export const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'books',
        component: BookListComponent,
        title: 'Book List'
      },
      {
        path: 'my-books',
        component: MyBooksComponent
      },
      {
        path: 'manage',
        component: ManageBookComponent,
        canActivate: [authGuard]

      },
      {
        path: 'manage/:bookId',
        component: ManageBookComponent
      },
      {
        path: 'my-waiting-list',
        component: BookListComponent,
        title: 'My Waiting List'
      },
      {
        path: 'my-returned-books',
        component: BookListComponent,
        title: 'My Returned Books'
      },
      {
        path: 'my-borrowed-books',
        component: BookListComponent,
        title: 'My Borrowed Books'
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
    path: 'non-found',
    component: NonFoundComponent
  },
  {
    path: '**',
    redirectTo: 'non-found'
  }
];
