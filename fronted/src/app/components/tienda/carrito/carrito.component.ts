import { NgFor } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
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

  // incrementarCantidad(articulo: any) {
  //   articulo.cantidad++;
    
  // }
  
  // decrementarCantidad(articulo: any) {
  //   if (articulo.cantidad > 1) {
  //     articulo.cantidad--;
  //   }
  // }

  modificarCantidad(articulo: productoCarrito, nuevaCantidad: number) {
    if (nuevaCantidad >= 0) {
      articulo.cantidad = nuevaCantidad; // Modificar la cantidad del artículo
      this.carritoService.modificarUds(articulo); // Llamar al método del servicio para actualizar el carrito
    }
  }
  
  eliminarArticuloDelCarrito(articulo: productoCarrito) {
    this.carritoService.eliminarArticuloDelCarrito(articulo);
  }


}