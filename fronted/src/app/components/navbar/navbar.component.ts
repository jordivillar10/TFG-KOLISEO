import { Component, } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { ContactanosComponent } from '../contactanos/contactanos.component';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, ContactanosComponent, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
  
constructor(private router: Router, private userService: UsersService) {}
  tokenExists: boolean = false;

  ngOnInit(): void {
    this.tokenExists = !!localStorage.getItem('token');
  }

  logOut() {
    this.userService.clearUserData(); // Limpia los datos del usuario

    localStorage.removeItem('token');
    // localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  scrollToContact() {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  scrollToTrains() {
    const contactElement = document.getElementById('entrenamientos');
    if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  scrollToActivitys() {
    const contactElement = document.getElementById('actividades');
    if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  }


}
