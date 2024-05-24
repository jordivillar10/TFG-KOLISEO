import { UsersService } from './../../../services/users.service';
import { NgFor } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { productoCarrito } from '../../../interfaces/productoCarrito';
import { CarritoService } from '../../../services/carrito.service';
import { Subscription } from 'rxjs';
import { TiendaComponent } from '../tienda.component';
import { Router, RouterLink } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { ToastrService } from 'ngx-toastr';

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
 

  constructor(private carritoService: CarritoService, private paymentService: PaymentService, 
    private userService: UsersService, private router: Router, private toastr: ToastrService) {}

  // iniciarPago() {
  //   this.paymentService.createCheckoutSession(envioCompra).subscribe(
  //     (response) => {
  //       // Manejar la respuesta del backend, por ejemplo, redireccionar al usuario a la página de pago
  //       console.log('Sesión de pago creada:', response);
  //     },
  //     (error) => {
  //       // Manejar errores
  //       console.error('Error al crear sesión de pago:', error);
  //     }
  //   );
  // }
  

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
    if (nuevaCantidad >= 1 && nuevaCantidad <= 10) {
      articulo.cantidad = nuevaCantidad; // Modificar la cantidad del artículo
      this.carritoService.modificarUds(articulo); // Llamar al método del servicio para actualizar el carrito
    } else if (nuevaCantidad > 10) {
      articulo.cantidad = 10; // Limitar la cantidad máxima a 10
      this.carritoService.modificarUds(articulo); // Llamar al método del servicio para actualizar el carrito
      this.toastr.warning('La cantidad máxima permitida es 10.', 'Advertencia');
    }
}


  
  eliminarArticuloDelCarrito(articulo: productoCarrito) {
    this.carritoService.eliminarArticuloDelCarrito(articulo);
  }

  formatPrice(price: number, quantity: number): string {
    return (price * quantity).toFixed(2);
  }
  
}