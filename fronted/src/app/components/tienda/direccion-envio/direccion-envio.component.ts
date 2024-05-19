import { CarritoService } from './../../../services/carrito.service';
import { Component } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';
import { Router } from '@angular/router';
import { productoCarrito } from '../../../interfaces/productoCarrito';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-direccion-envio',
  standalone: true,
  imports: [NgFor],
  templateUrl: './direccion-envio.component.html',
  styleUrl: './direccion-envio.component.css'
})
export class DireccionEnvioComponent {
  carrito: productoCarrito[] = [];
  private carritoSubscription: Subscription ;
  
  closeResult = '';
  constructor(private carritoService: CarritoService, private modalService: NgbModal, private paymentService: PaymentService) {
    this.carritoSubscription = this.carritoService.carrito$.subscribe(carrito => {
      this.carrito = carrito;
    });
  }
  ngOnInit() {
    this.carritoSubscription = this.carritoService.carrito$.subscribe(carrito => {
      this.carrito = carrito;
    });
  }

  ngOnDestroy() {
    this.carritoSubscription.unsubscribe();
  }

  iniciarPago() {
    this.paymentService.createCheckoutSession().subscribe(
      (response) => {
        // Manejar la respuesta del backend, por ejemplo, redireccionar al usuario a la página de pago
        console.log('Sesión de pago creada:', response);
      },
      (error) => {
        // Manejar errores
        console.error('Error al crear sesión de pago:', error);
      }
    );
  }
  getTotalPrice(): number {
    let total = 0;
    for (let producto of this.carrito) {
      total += producto.price * producto.cantidad;
    }
    return parseFloat(total.toFixed(2));
  }
  formatPrice(price: number, quantity: number): string {
    return (price * quantity).toFixed(2);
  }
}
