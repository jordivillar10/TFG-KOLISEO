import { Component, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { productoCarrito } from '../../../interfaces/productoCarrito';
import { CarritoService } from '../../../services/carrito.service';
import { FormsModule } from '@angular/forms'; 
import { NgFor, NgIf } from '@angular/common';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../../../services/payment.service';
import { PurchasesService } from '../../../services/purchases.service';
interface PurchaseWithProducts extends PurchasesService {
  products: { product_id: number, product_name: string, cantidad: number }[];
}
@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [NgIf, FormsModule, NgFor, NgbDatepickerModule],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent {
  purchases: PurchaseWithProducts[] = [];
  myPurchases: any[] = [];
  carrito: productoCarrito[] = [];
  private carritoSubscription: Subscription ;
  
  closeResult = '';
  constructor(private carritoService: CarritoService, 
    private modalService: NgbModal,
    private purchaseService: PurchasesService
  ) {
    this.carritoSubscription = this.carritoService.carrito$.subscribe(carrito => {
      this.carrito = carrito;
    });
  }

  ngOnInit(): void {
    const userId = this.purchaseService.getUserId();
    if (userId) {
      this.purchaseService.showHistorial(userId).subscribe((data: PurchaseWithProducts[]) => {
        this.myPurchases = data;
      }, error => {
        console.error('Error fetching purchases:', error);
      });
    } else {
      console.error('User is not logged in');
    }
  }
  
  
  
  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}

	
  // showHistorial() {
  //   this.purchaseService.showHistorial().subscribe({
        
  //   })
  // }
}
