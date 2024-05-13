import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterLink } from "@angular/router";
import { ContactanosComponent } from '../contactanos/contactanos.component';
import { EntrenamientosComponent } from '../entrenamientos/entrenamientos.component';
import { ActividadesComponent } from '../actividades/actividades.component';
import { UsersService } from '../../services/users.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterLink, ContactanosComponent, EntrenamientosComponent, ActividadesComponent, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user: any; // Variable para almacenar la información del usuario

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      (data: any) => {
        console.log("datos usuario",data);
        
        this.user = data; // Almacena la información del usuario cuando se obtiene del backend
      },
      (error: any) => {
        console.error('Error al obtener la información del usuario:', error);
      }
    );
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


