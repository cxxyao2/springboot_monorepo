import { CanActivateFn } from '@angular/router';
import { TokenService } from './services/token/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  if (!tokenService.isTokenNotValid()) {
    return false;
  }

  return true;
};
