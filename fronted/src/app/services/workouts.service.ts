import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrenamiento } from '../interfaces/entrenamiento';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {
  private myAppUri: string;
  private myApiUri: string;
  constructor(private http: HttpClient) {
    this.myAppUri = environment.endpoint;
    this.myApiUri = 'api/users'
  }

  showHistorialWorkouts(userId: number): Observable<Entrenamiento[]> {
    return this.http.get<Entrenamiento[]>(`${this.myAppUri}${this.myApiUri}/${userId}/workouts`)

  }

  getUserId(): number | null {
    const storedUserId = localStorage.getItem('userData');
    return storedUserId ? parseInt(storedUserId, 10) : null;
  }
}
