import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
  
constructor(private router: Router) {}

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
