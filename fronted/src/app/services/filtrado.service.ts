import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltradoService {
  private categoriaSeleccionadaSubject = new BehaviorSubject<number | null>(null);
  categoriaSeleccionada$: Observable<number | null> = this.categoriaSeleccionadaSubject.asObservable();
  mostrarTodosLosProductosSubject = new Subject<void>();
  constructor() { }

  actualizarCategoriaSeleccionada(categoriaId: number) {
    console.log('Categoría seleccionada:', categoriaId);
    this.categoriaSeleccionadaSubject.next(categoriaId);
  }

  mostrarTodosLosProductos() {
    this.mostrarTodosLosProductosSubject.next();
  }
}
