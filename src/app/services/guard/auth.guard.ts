import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router : Router = inject(Router);

  const localData = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const userRole : string = localData.tipoPerfil.descricao;
  
  if(userRole == route.data['role']){
    return true;
  }

  router.navigate(['login']);
  
  return false;
  
};
