import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router, RouterLink } from "@angular/router";
import { ContactanosComponent } from '../contactanos/contactanos.component';
import { EntrenamientosComponent } from '../entrenamientos/entrenamientos.component';
import { ActividadesComponent } from '../actividades/actividades.component';
import { NgIf } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { UserData } from '../../interfaces/userData';
import { FooterComponent } from '../footer/footer.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterLink, ContactanosComponent, EntrenamientosComponent, ActividadesComponent, NgIf , FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userData: any;
  mensajeBienvenida: boolean = false;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.userData$.subscribe(userData => {
      this.userData = userData;
      if (this.userData) {
        this.mostrarMensajeBienvenida();
      }
    });
  }

  mostrarMensajeBienvenida(): void {
    const hasSeenWelcomeMessage = localStorage.getItem('hasSeenWelcomeMessage');
    console.log('hasSeenWelcomeMessage:', hasSeenWelcomeMessage); // Debugging log
    if (!hasSeenWelcomeMessage) {
      this.mensajeBienvenida = true;
      localStorage.setItem('hasSeenWelcomeMessage', 'true');
      console.log('Setting hasSeenWelcomeMessage to true'); // Debugging log
    } else {
      this.mensajeBienvenida = false;
    }
    console.log('showWelcomeMessage:', this.mensajeBienvenida); // Debugging log
  }
}
  // constructor(private _productService: ProductService){}

  // ngOnInit(): void {
  //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   //Add 'implements OnInit' to the class.
  //   this.getProducts();
  // }

  // getProducts(){
  //   this._productService.getProducts().subscribe(data => {
  //     console.log(data);
  //   })
  // }


