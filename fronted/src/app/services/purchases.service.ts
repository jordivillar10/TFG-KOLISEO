import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Purchase {
  purchase_id: number;
  total: number;
  purchase_date: Date;
  calle: string;
  numero: string;
  ciudad: string;
  cp: string;
}

export interface Product {
  product_id: number;
  product_name: string;
  cantidad: number;
}

export interface PurchaseWithProducts extends Purchase {
  products: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  private myAppUri: string;
  private myApiUri: string;
  constructor(private http: HttpClient) {
    this.myAppUri = environment.endpoint;
    this.myApiUri = 'api/users'
  }

  showHistorial(userId: number): Observable<PurchaseWithProducts[]> {
    return this.http.get<PurchaseWithProducts[]>(`${this.myAppUri}${this.myApiUri}/${userId}/purchases`)

  }

  getUserId(): number | null {
    const storedUserId = localStorage.getItem('userData');
    return storedUserId ? parseInt(storedUserId, 10) : null;
  }
}
