import { Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { ContactanosComponent } from '../contactanos/contactanos.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, ContactanosComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
  
constructor(private router: Router) {}

  logOut() {
    localStorage.removeItem('token');
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
