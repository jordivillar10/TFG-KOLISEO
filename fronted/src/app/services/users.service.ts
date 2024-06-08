import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private myAppUri: string;
  private myApiUri: string;
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  constructor(private http: HttpClient) { 
    this.myAppUri = environment.endpoint;
    this.myApiUri = 'api/users'
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    if (userData) {
      this.userDataSubject.next(userData);
    }

  }

  signIn(user: User): Observable<any> {
    return this.http.post(`${this.myAppUri}${this.myApiUri}`, user);
  }

  login(user: User): Observable<string> {
    return this.http.post<string>(`${this.myAppUri}${this.myApiUri}/login`, user);
  }


  setUserData(userData: any) {
    this.userDataSubject.next(userData);
    localStorage.setItem('userData', JSON.stringify(userData));

  }

  clearUserData() {
    this.userDataSubject.next(null);
    localStorage.removeItem('userData');
  }

  // veerifica si el usuario está autenticado
  isLoggedIn(): boolean {
    // Por ejemplo, puedes verificar si hay un token en el localStorage
    const token = localStorage.getItem('token');
    return token !== null; // Devuelve true si hay un token en el localStorage
  }

  // getUserPurchases(userData: number)  {
  //   return this.http.get<number>(`${this.myAppUri}${this.myApiUri}/${userId}/purchases`);
  // }

}
