import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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

  showHistorial(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUri}${this.myApiUri}/${userId}/purchases`)

  }

  getUserId(): number | null {
    const storedUserId = localStorage.getItem('userData');
    return storedUserId ? parseInt(storedUserId, 10) : null;
  }
}
