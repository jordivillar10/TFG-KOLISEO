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
  private carritoSubscription: Subscription ;
  
  closeResult = '';
  constructor(private carritoService: CarritoService, private modalService: NgbModal, 
    private paymentService: PaymentService, private toastrSvc: ToastrService,
  private _errorService: ErrorService) {
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

  // iniciarPagoYCrearEnvio() {
  //   // Validar los datos del envío
  //   if (this.name === '' || this.surname === '' || this.calle === '' || this.numero === '' || this.ciudad === '' || this.pais === '' || this.cp === '') {
  //     this.toastrSvc.error('Todos los campos son obligatorios', 'Error');
  //     return;
  //   }
  
  //   // Crear el objeto de envío
  //   const envio: Envio = {
  //     name: this.name,
  //     surname: this.surname,
  //     calle: this.calle,
  //     numero: this.numero,
  //     ciudad: this.ciudad,
  //     pais: this.pais,
  //     cp: this.cp
  //   };
  
  //   // Llamar al servicio para añadir la dirección
  //   this.paymentService.añadirDireccion(envio).subscribe({
  //     next: (v) => {
  //       console.log('Envío creado:', v);
  
  //       // Una vez creado el envío, iniciar la sesión de pago
  //       this.iniciarPago();
  //     },
  //     error: (e: HttpErrorResponse) => {
  //       this._errorService.msjError(e);
  //     }
  //   });
  // }

  iniciarPago() {
    this.paymentService.createCheckoutSession().subscribe(
      (response) => {
        // Manejar la respuesta del backend, por ejemplo, redireccionar al usuario a la página de pago
        console.log('Sesión de pago creada:', response);
        // this.addEnvio()
        if (response && response.url) {
          window.location.href = response.url;
        }
      },
      (error) => {  
        // Manejar errores
        console.error('Error al crear sesión de pago:', error);
      }
    );
  }
  
  

  // iniciarPago() {
  //   this.paymentService.createCheckoutSession().subscribe(
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

  addEnvio() {
      // if(this.name == '' || this.surname == '' || this.calle == '' || this.numero == '' || this.ciudad == '' || this.pais == '' || this.cp == '') {
      //   this.toastrSvc.error('Todos los campos son obligatorios', 'Error');
      //   return;
      // }

    const envio: Envio = {
      name: this.name,
      surname: this.surname,
      calle: this.calle,
      numero: this.numero,
      ciudad: this.ciudad,
      pais: this.pais,
      cp: this.cp
    }
    this.paymentService.añadirDireccion(envio).subscribe({
      next: (v) => {
        this.iniciarPago();
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        }
    })
  }
}
