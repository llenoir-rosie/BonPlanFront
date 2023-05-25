import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  

    //   store the URL so we can redirect after logging in
    //   redirectUrl: string | null = null;

    // console.log(authService.username$);
    // if (authService.username$ == sessionStorage.getItem('currentUser')) {
    //     return true;
    // }
    // else {
    //     // Redirect to the login page
    //     return router.parseUrl('/login');
    // }
    return true;
    

};

