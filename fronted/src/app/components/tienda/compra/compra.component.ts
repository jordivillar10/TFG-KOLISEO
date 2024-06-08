import { Component, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { productoCarrito } from '../../../interfaces/productoCarrito';
import { CarritoService } from '../../../services/carrito.service';
import { FormsModule } from '@angular/forms'; 
import { DatePipe, NgFor, NgIf } from '@angular/common';
import {  NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PurchaseWithProducts, PurchasesService } from '../../../services/purchases.service';
import { BuscadorTiendaComponent } from '../buscador-tienda/buscador-tienda.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [NgIf, FormsModule, NgFor, NgbDatepickerModule, BuscadorTiendaComponent, RouterModule],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent {
  purchases: PurchaseWithProducts[] = [];
  // myPurchases: any[] = [];
  carrito: productoCarrito[] = [];
  private carritoSubscription: Subscription ;
  
  closeResult = '';
  constructor(private carritoService: CarritoService, 
    private modalService: NgbModal,
    private purchaseService: PurchasesService,
    private datePipe: DatePipe
  ) {
    this.carritoSubscription = this.carritoService.carrito$.subscribe(carrito => {
      this.carrito = carrito;
    });
  }

  ngOnInit(): void {
    const userId = this.purchaseService.getUserId();
    if (userId) {
      this.purchaseService.showHistorial(userId).subscribe((data: PurchaseWithProducts[]) => {
        this.purchases = data.map(purchase => ({
          ...purchase,
          purchase_date: new Date(purchase.purchase_date)
        }));
      }, error => {
        console.error('Error fetching purchases:', error);
      });
    } else {
      console.error('El usuario debe iniciar sesión');
    }
  }
  
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'd \'de\' MMMM \'de\' yyyy', 'es-ES') || '';
  }
  
  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}

	
  // showHistorial() {
  //   this.purchaseService.showHistorial().subscribe({
        
  //   })
  // }
}
