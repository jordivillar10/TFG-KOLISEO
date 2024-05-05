import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterLink } from "@angular/router";
import { ProductService } from '../../services/product.service';
import { ContactanosComponent } from '../contactanos/contactanos.component';
import { EntrenamientosComponent } from '../entrenamientos/entrenamientos.component';
import { ActividadesComponent } from '../actividades/actividades.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterLink, ContactanosComponent, EntrenamientosComponent, ActividadesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  // constructor(private _productService: ProductService){}

  // ngOnInit(): void {
  //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   //Add 'implements OnInit' to the class.
  //   this.getProducts();
  // }

  // getProducts(){
  //   this._productService.getProducts().subscribe(data => {
  //     console.log(data);
  //   })
  // }

}
