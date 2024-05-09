import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { productoCarrito } from '../interfaces/productoCarrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject = new BehaviorSubject<productoCarrito[]>([]);
  private contadorCarrito: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  carrito$ = this.carritoSubject.asObservable();
  private claveLS = 'productosCarrito';

  constructor() {
    const productosGuardados = localStorage.getItem(this.claveLS);
    if (productosGuardados) {
      this.carritoSubject.next(JSON.parse(productosGuardados));
      this.contadorCarrito.next(JSON.parse(productosGuardados).length);
    }
   }

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
    localStorage.setItem(this.claveLS, JSON.stringify(carritoActual));
  }

  obtenerContadorCarrito(): Observable<number> {
    return this.contadorCarrito.asObservable();
  }

  getProductosCarrito(): Observable<any[]> {
    return this.carritoSubject.asObservable();
  }

  vaciarCarrito() {
    this.carritoSubject.next([]); // Asigna un array vacío al BehaviorSubject
    this.contadorCarrito.next(0);
    localStorage.removeItem(this.claveLS);
  }

  eliminarArticuloDelCarrito(articulo: productoCarrito) {
    const carritoActual = this.carritoSubject.getValue();
    
    // Filtrar el carrito para eliminar solo el artículo especificado
    const nuevoCarrito = carritoActual.filter(item => item.id !== articulo.id);
    
    // Actualizar el BehaviorSubject del carrito y el contador del carrito
    this.carritoSubject.next(nuevoCarrito);
    this.contadorCarrito.next(nuevoCarrito.length);
    
    // Actualizar el almacenamiento local
    localStorage.setItem(this.claveLS, JSON.stringify(nuevoCarrito));
  }
}
