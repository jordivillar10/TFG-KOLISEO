import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
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
  page = 4;
  sliderImages = [
   "/assets/img/slider1.2.png",
   "/assets/img/slider2.png",
  "/assets/img/slider3.png",
  "/assets/img/slider4.png",
 ]

 
}
