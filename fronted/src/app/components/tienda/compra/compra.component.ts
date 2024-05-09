import { Component, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { productoCarrito } from '../../../interfaces/productoCarrito';
import { CarritoService } from '../../../services/carrito.service';
import { FormsModule } from '@angular/forms'; 
import { NgFor, NgIf } from '@angular/common';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [NgIf, FormsModule, NgFor, NgbDatepickerModule],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent {
  carrito: productoCarrito[] = [];
  private carritoSubscription: Subscription ;
  
  closeResult = '';
  constructor(private carritoService: CarritoService, private modalService: NgbModal) {
    this.carritoSubscription = this.carritoService.carrito$.subscribe(carrito => {
      this.carrito = carrito;
    });
  }
  
  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
  selectedMethod: string = '';
    paypalForm = { username: '', password: '' };
    creditCardForm = { cardName: '', cardNumber: '', expiryDate: '', cvv: '' };

    selectPaymentMethod(event: any) {
        this.selectedMethod = event.target.value;
    }
    
    formatExpiryDate(event: any) {
      let input = event.target.value;
      if (input.length === 2 && event.data !== '/') {
        input += '/';
      }
      this.creditCardForm.expiryDate = input;
    }
    isExpiryDateValid(date: string): boolean {
      let today = new Date();
      let currentYear = today.getFullYear().toString().slice(-2);
      let currentMonth = (today.getMonth() + 1).toString();
      if (currentMonth.length === 1) {
        currentMonth = '0' + currentMonth;
      }
      return date >= currentMonth + '/' + currentYear;
    }
    cardNumber: string = '';
    cardType: string = '';
    
    detectCardType() {
      if (this.cardNumber === '') {
        this.cardType = ''; 
        return;
      }

      const firstDigit = this.cardNumber.charAt(0);
      switch (firstDigit) {
        case '4':
          this.cardType = 'VISA';
          break;
        case '5':
          this.cardType = 'Mastercard';
          break;
        default:
          this.cardType = 'Desconocida';
          break;
      }
    }

    getTotalPrice(): number {
      let total = 0;
      for (let producto of this.carrito) {
        total += producto.price * producto.cantidad;
      }
      return total;
    }
}
