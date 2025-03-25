import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {TokenService} from '../token/token.service';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const token = inject(TokenService).token;
  if (token) {
    const newReq = req.clone({
      headers: req.headers.append('Authorization', 'Bearer ' + token),
    });
    return next(newReq);
  }

  // if(token) {
  //   const authReq = req.clone({
  //     headers: new HttpHeaders({
  //       'Authorization': 'Bearer ' + token,
  //     })
  //   });
  // }

  return next(req);


};
