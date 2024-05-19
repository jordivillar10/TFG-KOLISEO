import { ToastrService } from 'ngx-toastr';
import { FiltradoService } from './../../../services/filtrado.service';
import { productoCarrito } from './../../../interfaces/productoCarrito';
import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { CarritoService } from '../../../services/carrito.service';
import { Subscription } from 'rxjs';

// register Swiper custom elements
register();

@Component({
  selector: 'app-dashboard-tienda',
  standalone: true,
  imports: [NgFor, NgbPaginationModule],
  templateUrl: './dashboard-tienda.component.html',
  styleUrl: './dashboard-tienda.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardTiendaComponent {
[x: string]: any;
  page = 4;
  sliderImages = [
   "/assets/img/slider1.2.png",
   "/assets/img/slider2.png",
  "/assets/img/slider3.png",
  "/assets/img/slider4.png",
 ];
 productos: Product[] = [];
 productosOriginales: Product[] = [];

 private categoriaSubscription: Subscription;
 private mostrarTodosLosProductosSubscription: Subscription;

 constructor(private _productService: ProductService,
  private carritoService: CarritoService,
  private filtradoService: FiltradoService,
  private toastr: ToastrService
 ) {
  this.categoriaSubscription = this.filtradoService.categoriaSeleccionada$.subscribe(categoriaId => {
    if (categoriaId !== null) {
      this.filtrarProductos(categoriaId);
    }
  });
  this.mostrarTodosLosProductosSubscription = this.filtradoService.mostrarTodosLosProductosSubject.subscribe(() => {
    this.mostrarTodosLosProductos();
  });
 }

 ngOnInit() {
    this.getProducts();
    // console.log("probando eventos ciclo vida");
  }
  
  ngOnDestroy() {
    this.categoriaSubscription.unsubscribe();
    this.mostrarTodosLosProductosSubscription.unsubscribe();
  }

  filtrarProductos(categoriaId: number) {
    
    // console.log('Filtrando productos para la categoría:', categoriaId);

    this.productos = this.productosOriginales.filter(producto => producto.category_id === categoriaId);
    // console.log('Productos filtrados:', this.productos);

  }

  mostrarTodosLosProductos() {
    this.productos = this.productosOriginales;
  }

  getProducts() {
    this._productService
    .getProducts()
    .subscribe(data => { 
      this.productos = data;
      this.productosOriginales = data;
     //  [0].name
      // console.log(this.productos);
      
     //  console.log(typeof(this.productosPrueba[0].id)); 
    });
  }
  addToCart(product: Product) {
    const productoParaCarrito: productoCarrito = {
      id: product.id,
      name: product.name,
      price: product.price,
      cantidad: 1 
    };
    this.carritoService.agregarAlCarrito(productoParaCarrito);
    this.toastr.success('Producto añadido al carrito');
  }

  onTerminoBusquedaChanged(terminoBusqueda: string) {
    if (terminoBusqueda.trim() === '') {
      this.productos = this.productosOriginales;
    } else {
      this.productos = this.productosOriginales.filter(productosOriginales =>
        productosOriginales.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
    }
  }
  
  // addToCart(product: Product) {
  //   // console.log(product);
    
  //   let pCarrito : productoCarrito = {
  //     id: product.id,
  //     name: product.name,
  //     price: product.price,
  //     cantidad: 1
  //   }
  //   if(localStorage.getItem("carrito") === null){
  //     let carrito: productoCarrito[] = [];
  //     carrito.push(pCarrito);
  //     localStorage.setItem("carrito", JSON.stringify(carrito))
  //   }
  //   else {
  //     let carritoStorage = localStorage.getItem("carrito") as string;
  //     let carrito = JSON.parse(carritoStorage);
  //     //compruebo si el producto se encuentra en el array, entonces recorro el arreglo.
  //     let index = -1; //me indica la posic del producto que estoy pretendiendo agregar a mi carrito
  //     for (let i = 0; i < carrito.length; i++) {
  //       let prodC: productoCarrito = carrito[i];
  //       if (pCarrito.id === prodC.id) {
  //         index = i;
  //         break;
  //       }
  //     }
  //     if(index === -1) {
  //       carrito.push(pCarrito);
  //       localStorage.setItem("carrito", JSON.stringify(carrito))
  //     }
  //     else {
  //       let productoCarrito: productoCarrito = carrito[index];
  //       productoCarrito.cantidad!++;
  //       carrito[index] = productoCarrito;
  //       localStorage.setItem("carrito", JSON.stringify(carrito))
  //     }

  //     localStorage.setItem("carrito", JSON.stringify(carrito));
  //   }
  //   this.carritoService.agregarAlCarrito(pCarrito);
  // }
  
}