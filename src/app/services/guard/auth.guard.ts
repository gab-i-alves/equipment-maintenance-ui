import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router : Router = inject(Router);

  const localData = localStorage.getItem('user');

  const role : string = route.data['role'];
  
  if(localData == role){
    return true;
  }

  router.navigate(['login']);
  
  return false;
  
};
