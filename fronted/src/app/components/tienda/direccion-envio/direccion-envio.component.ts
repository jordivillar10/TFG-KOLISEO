import { CarritoService } from './../../../services/carrito.service';
import { Component } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';
import { Router } from '@angular/router';
import { productoCarrito } from '../../../interfaces/productoCarrito';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Envio } from '../../../interfaces/envio';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { User } from '../../../interfaces/user';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-direccion-envio',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './direccion-envio.component.html',
  styleUrl: './direccion-envio.component.css'
})
export class DireccionEnvioComponent {
  name: string = '';
  surname: string = '';
  calle: string = '';
  numero: string = '';
  ciudad: string = '';
  pais: string = '';
  cp: string = '';
  carrito: productoCarrito[] = [];
  user: any ;
  
  private carritoSubscription: Subscription ;
  private userSubscription: Subscription;
  closeResult = '';

  constructor(
    private carritoService: CarritoService, private errorService: ErrorService,
    private paymentService: PaymentService, private toastrSvc: ToastrService,
    private userService: UsersService
  ) {
    this.carritoSubscription = this.carritoService.carrito$.subscribe(carrito => {
      this.carrito = carrito;
    });
    this.userSubscription = this.userService.userData$.subscribe(user => {
      this.user = user;
    });

  }
  ngOnInit() {
    // console.log(this.user);
    
    this.carritoSubscription = this.carritoService.carrito$.subscribe(carrito => {
      this.carrito = carrito;
    });

    this.userSubscription = this.userService.userData$.subscribe(user => {
      // if (user) {
      //   this.user = user;
      //   console.log('Usuario logeado', this.user);
      // } else {
      //   console.log('No hay usuario logeado');
      // }
      this.user = user;
    });

  }

  ngOnDestroy() {
    if (this.carritoSubscription) {
      this.carritoSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  

  iniciarPagoYCrearEnvio() {
    // Validar los datos del envío
    if (this.name === '' || this.surname === '' || this.calle === '' || this.numero === '' || this.ciudad === '' || this.pais === '' || this.cp === '') {
      this.toastrSvc.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Crear el objeto de envío
    const envioCompra = {
      cart: this.carrito, // El carrito de compras
      user_id: this.user, // El ID del usuario
      name: this.name,
      surname: this.surname,
      calle: this.calle,
      numero: this.numero,
      ciudad: this.ciudad,
      pais: this.pais,
      cp: this.cp
  };
  console.log(envioCompra);
  
    // Llamar al servicio para iniciar la sesión de pago y guardar el envío y la compra
    this.paymentService.createCheckoutSession(envioCompra).subscribe(
      (response) => {
          console.log('Sesión de pago creada:', response);
          // Redirigir al usuario a la página de pago de Stripe
          if (response && response.url) {
              window.location.href = response.url;
          }
      },
      (error) => {
          console.error('Error al crear sesión de pago:', error);
      }
  );
  }

  // iniciarPago() {
  //   this.paymentService.createCheckoutSession().subscribe(
  //     (response) => {
  //       // Manejar la respuesta del backend, por ejemplo, redireccionar al usuario a la página de pago
  //       console.log('Sesión de pago creada:', response);
  //       // this.addEnvio()
  //       if (response && response.url) {
  //         window.location.href = response.url;
  //       }
  //     },
  //     (error) => {  
  //       // Manejar errores
  //       console.error('Error al crear sesión de pago:', error);
  //     }
  //   );
  // }
  
  

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

  // addEnvio() {
  //     // if(this.name == '' || this.surname == '' || this.calle == '' || this.numero == '' || this.ciudad == '' || this.pais == '' || this.cp == '') {
  //     //   this.toastrSvc.error('Todos los campos son obligatorios', 'Error');
  //     //   return;
  //     // }

  //   const envio: Envio = {
  //     name: this.name,
  //     surname: this.surname,
  //     calle: this.calle,
  //     numero: this.numero,
  //     ciudad: this.ciudad,
  //     pais: this.pais,
  //     cp: this.cp
  //   }
  //   this.paymentService.añadirDireccion(envio).subscribe({
  //     next: (v) => {
  //       this.iniciarPago();
  //     },
  //     error: (e: HttpErrorResponse) => {
  //       this._errorService.msjError(e);
  //       }
  //   })
  // }
}
