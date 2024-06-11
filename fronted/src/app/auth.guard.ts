import {  ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UsersService } from './services/users.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private userService: UsersService, private router: Router) {}

  canActivate( state: RouterStateSnapshot): boolean {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      localStorage.setItem('redirectUrl', state.url);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
