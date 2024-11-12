import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../../_shared/service/local-storage.service';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  
  if(!localStorageService.getToken()){
    router.navigate(['/login']);
    return false;
  }
  return true;
};
