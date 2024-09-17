import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router : Router = inject(Router);

  const localData = localStorage.getItem('user');

  console.log(localData);
  
  if(localData != null){
    return true;
  }

  router.navigate(['login']);
  
  return false;
  
};
