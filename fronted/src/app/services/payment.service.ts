import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CarritoService } from './carrito.service';
import { tap } from 'rxjs/operators'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private myAppUri: string;
  private myApiUri: string;

  constructor(private http: HttpClient, private carritoService: CarritoService, private userService: UsersService, private router: Router) { 
    this.myAppUri = environment.endpoint;
    this.myApiUri = 'api/payment';
  }

  createCheckoutSession(): Observable<any> {
    const carrito = this.carritoService.obtenerCarritoLS();
    console.log('Carrito:', carrito); 

    return this.http.post<any>(`${this.myAppUri}${this.myApiUri}/create-checkout-session`, {cart: carrito})
    .pipe(
      tap((response: any) => { 
        if (response && response.url) {
          window.location.href = response.url;
        }
      })
    );
  }
  
}
