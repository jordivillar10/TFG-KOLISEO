import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { productoCarrito } from '../../../interfaces/productoCarrito';
import { CarritoService } from '../../../services/carrito.service';
import { Subscription } from 'rxjs';
import { TiendaComponent } from '../tienda.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [NgFor, TiendaComponent, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent  {
  carrito: productoCarrito[] = [];
  private carritoSubscription: Subscription = new Subscription(); 

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.carritoSubscription = this.carritoService.carrito$.subscribe(carrito => {
      this.carrito = carrito;
    });
  }

  ngOnDestroy() {
    this.carritoSubscription.unsubscribe();
  }

  incrementarCantidad(producto: any) {
    producto.cantidad++;
    
  }
  
  decrementarCantidad(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
  }
  
  eliminarArticuloDelCarrito(articulo: productoCarrito) {
    this.carritoService.eliminarArticuloDelCarrito(articulo);
  }
}