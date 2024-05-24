import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-compra-hecha',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './compra-hecha.component.html',
  styleUrl: './compra-hecha.component.css'
})
export class CompraHechaComponent {
  private myAppUri: string;
  private myApiUri: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    this.myAppUri = environment.endpoint;
    this.myApiUri = 'api/payment';
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const sessionId = params['session_id'];
      const userId = params['user_id'];
      const name = params['name'];
      const surname = params['surname'];
      const calle = params['calle'];
      const numero = params['numero'];
      const ciudad = params['ciudad'];
      const pais = params['pais'];
      const cp = params['cp'];
      const totalQuantity = params['totalQuantity'];

      // Verificar si ya se ha registrado la compra con este sessionId
      const purchaseKey = `purchase_${sessionId}`;
      const isPurchaseRegistered = localStorage.getItem(purchaseKey);
      
      if (sessionId && !isPurchaseRegistered) {
        this.http.get(`${this.myAppUri}${this.myApiUri}/success`, {
          params: {
            session_id: sessionId,
            user_id: userId,
            name: name,
            surname: surname,
            calle: calle,
            numero: numero,
            ciudad: ciudad,
            pais: pais,
            cp: cp,
            totalQuantity: totalQuantity
          },
          responseType: 'text'
        }).subscribe({
          next: (response) => {
            console.log('Compra registrada con éxito:', response);
            // Marcar la compra como registrada para este sessionId
            localStorage.setItem(purchaseKey, 'true');
            // Aquí puedes manejar la respuesta y actualizar la UI según sea necesario
          },
          error: (error) => {
            console.error('Error registrando la compra:', error);
            console.error('Detalles del error:', error.message);
            console.error('Estado del error:', error.status);
            console.error('Encabezados del error:', error.headers);
            console.error('URL del error:', error.url);
            console.error('Nombre del error:', error.name);
            // Aquí puedes manejar el error y actualizar la UI según sea necesario
          }
        });
      }
    });
    this.clearCart();

  }
  clearCart(): void {
    localStorage.removeItem('carrito');
    console.log('Carrito limpio.');
  }
}
