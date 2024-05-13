import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private myAppUri: string;
  private myApiUri: string;

  constructor(private http: HttpClient) { 
    this.myAppUri = environment.endpoint;
    this.myApiUri = 'api/users'
  }

  signIn(user: User): Observable<any> {
    return this.http.post(`${this.myAppUri}${this.myApiUri}`, user);
  }

  login(user: User): Observable<string> {
    return this.http.post<string>(`${this.myAppUri}${this.myApiUri}/login`, user);
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.myAppUri}${this.myApiUri}`)
  }
}
