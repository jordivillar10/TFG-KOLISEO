import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { BuscadorTiendaComponent } from '../buscador-tienda/buscador-tienda.component';
import { NavbarTiendaComponent } from '../navbar-tienda/navbar-tienda.component';
import { DashboardTiendaComponent } from '../dashboard-tienda/dashboard-tienda.component';
import { NgIf } from '@angular/common';
import { FooterTiendaComponent } from '../footer-tienda/footer-tienda.component';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, BuscadorTiendaComponent, NavbarTiendaComponent, DashboardTiendaComponent, FooterTiendaComponent, NgIf],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent  {

  // showBuscador: boolean = false;
  // lastScrollTop = 0;
  
  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  //   if (currentScroll > this.lastScrollTop) {
  //     // Scrolling down
  //     this.showBuscador = false;
  //   } else {
  //     // Scrolling up
  //     this.showBuscador = true;
  //   }
  //   this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  // }
}
