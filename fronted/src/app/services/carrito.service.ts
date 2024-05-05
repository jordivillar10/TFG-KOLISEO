import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { productoCarrito } from '../interfaces/productoCarrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject = new BehaviorSubject<productoCarrito[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  constructor() { }

  agregarAlCarrito(producto: productoCarrito) {
    const carritoActual = this.carritoSubject.getValue();
    const index = carritoActual.findIndex(item => item.id === producto.id);

    if (index !== -1) {
      // Si el producto ya está en el carrito, aumenta la cantidad
      carritoActual[index].cantidad += producto.cantidad;
    } else {
      // Si el producto no está en el carrito, agregarlo
      carritoActual.push(producto);
    }

    this.carritoSubject.next([...carritoActual]); // Emite un nuevo array para asegurar la inmutabilidad
  }

  vaciarCarrito() {
    this.carritoSubject.next([]); // Asigna un array vacío al BehaviorSubject
  }
}
