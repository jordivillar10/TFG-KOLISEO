import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { BuscadorTiendaComponent } from '../buscador-tienda/buscador-tienda.component';
import { NavbarTiendaComponent } from '../navbar-tienda/navbar-tienda.component';
import { DashboardTiendaComponent } from '../dashboard-tienda/dashboard-tienda.component';
import { NgIf } from '@angular/common';
import { FooterTiendaComponent } from '../footer-tienda/footer-tienda.component';
import { ProductService } from '../../../services/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, BuscadorTiendaComponent, NavbarTiendaComponent, DashboardTiendaComponent, FooterTiendaComponent, NgIf],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent  {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const sessionId = params['session_id'];
      if (sessionId) {
        // this.http.get("https://54.196.194.245:3001/inicioTienda")
        this.http.get("http://localhost:3001/inicioTienda")
          .subscribe(response => {
            console.log('Compra registrada con éxito:', response);
          }, error => {
            console.error('Error registrando la compra:', error);
          });
      }
    });
  }
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
