import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUri: string;
  private myApiUri: string;

  constructor(private http: HttpClient) { 
    this.myAppUri = environment.endpoint;
    this.myApiUri = 'api/products'
  }

  getProducts(): Observable<Product[]> {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    // return this.http.get<Product[]>(`${this.myAppUri}${this.myApiUri}`, {headers: headers});
    return this.http.get<Product[]>(`${this.myAppUri}${this.myApiUri}`)
  }
}
