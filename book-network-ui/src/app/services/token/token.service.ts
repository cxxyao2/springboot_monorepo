import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
  }

  set token(token: string) {
      localStorage.setItem('token', token);
  }

  get token() {
    if (isPlatformServer(this.platformId)) {
      return '';
    }
    return localStorage.getItem('token') as string;
  }
}
