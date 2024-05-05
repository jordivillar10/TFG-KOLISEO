import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productoCarrito } from '../../../interfaces/productoCarrito';


@Component({
  selector: 'app-buscador-tienda',
  standalone: true,
  imports: [RouterLink,NgFor],
  templateUrl: './buscador-tienda.component.html',
  styleUrl: './buscador-tienda.component.css'
})
export class BuscadorTiendaComponent implements OnInit{
  
  constructor(private offcanvasService: NgbOffcanvas) {}
 
	openEnd(content: TemplateRef<any>) {
    	this.offcanvasService.open(content, { position: 'start' });
    }
    
    contadorCarrito?: number ;
    mostrarCarrito: boolean = true;
    productosCarrito: productoCarrito[] | undefined;
  

  
    ngOnInit() {
      console.log("probando eventos ciclo vida2");

      let carritoStorage = localStorage.getItem("carrito") as string;
      let carrito = JSON.parse(carritoStorage);
      this.productosCarrito = carrito;
      ;
    }
  
    toggleCarrito() {
      this.mostrarCarrito = !this.mostrarCarrito;
    }
  
    
}
