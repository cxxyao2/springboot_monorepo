import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { jwtDecode } from "jwt-decode";

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

  isTokenNotValid() {
    const token = this.token;
    if (!token) {
      return false;
    }
    // decode token . get user identity
    const decoded = jwtDecode(token);
    console.log(decoded);
    return true;

  }
}


// const tokenDate = new Date(timestamp * 1000);
// decode token  之後得到的object 内容
// authroies: array[2] 0:'ROLE_USER' 1:'ROLE_ADMIN'
// exp:123332
// fullName: "good1u "
// iat:1111
// sub: "monky17@gmail.com"