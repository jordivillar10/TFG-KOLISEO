import { CarritoService } from './../../../services/carrito.service';
import { getProducts } from './../../../../../../server/src/controllers/product';
import { productoCarrito } from './../../../interfaces/productoCarrito';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users.service';


@Component({
  selector: 'app-buscador-tienda',
  standalone: true,
  imports: [RouterLink,NgFor],
  templateUrl: './buscador-tienda.component.html',
  styleUrl: './buscador-tienda.component.css'
})
export class BuscadorTiendaComponent {
  contadorCarrito?: number ;
  mostrarCarrito: boolean = true;
  // productosCarrito: productoCarrito[] | undefined;

  carrito: productoCarrito[] = [];
  private carritoSubscription: Subscription ;

  constructor(private offcanvasService: NgbOffcanvas, private carritoService: CarritoService, private userService : UsersService,
    private router: Router
  ) {
    this.carritoSubscription = this.carritoService.carrito$.subscribe(carrito => {
      this.carrito = carrito;
    });
  }
  ngOnDestroy() {
    this.carritoSubscription.unsubscribe();
  }
	openEnd(content: TemplateRef<any>) {
    	this.offcanvasService.open(content, { position: 'start' });
    }

    // ngOnInit() {
    //   console.log("probando eventos ciclo vida2");

    //   let carritoStorage = localStorage.getItem("carrito") as string;
    //   let carrito = JSON.parse(carritoStorage);
    //   this.productosCarrito = carrito;
    //   console.log("productos en el carrito->", this.productosCarrito);
    // }
  
    toggleCarrito() {
      this.mostrarCarrito = !this.mostrarCarrito;
    }
  
    vaciarCarrito() {
      this.carritoService.vaciarCarrito();
    }

    formatPrice(price: number, quantity: number): string {
      return (price * quantity).toFixed(2);
    }
    
    logOut() {
      this.userService.clearUserData(); // Limpia los datos del usuario
      
      localStorage.removeItem('token');
      localStorage.removeItem('carrito');
      // localStorage.removeItem('userData');
      this.router.navigate(['/login']);
    }
}
