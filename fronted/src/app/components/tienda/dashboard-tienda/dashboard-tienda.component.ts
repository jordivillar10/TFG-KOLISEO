import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { productoCarrito } from '../../../interfaces/productoCarrito';
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
 productosPrueba: Product[] = [];

 constructor(private _productService: ProductService
 ) {}

 ngOnInit() {
    this.getProducts();
    console.log("probando eventos ciclo vida");
  }
  
  getProducts() {
    this._productService
    .getProducts()
    .subscribe(data => { 
      this.productosPrueba = data;
     //  [0].name
      console.log(this.productosPrueba);
      
     //  console.log(typeof(this.productosPrueba[0].id)); 
    });
  }

  @Input() producto: any;

  addToCart(product: Product) {
    console.log(product);
    
    let pCarrito : productoCarrito = {
      id: product.id,
      name: product.name,
      price: product.price,
      cantidad: 1
    }
    if(localStorage.getItem("carrito") === null){
      let carrito: productoCarrito[] = [];
      carrito.push(pCarrito);
      localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    else {
      let carritoStorage = localStorage.getItem("carrito") as string;
      let carrito = JSON.parse(carritoStorage);
      carrito.push(pCarrito);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  }
 
}
