import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Exercise } from '../interfaces/exercises';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private myAppUri: string;
  private myApiUri: string;

  constructor(private http: HttpClient) { 
    this.myAppUri = environment.endpoint;
    this.myApiUri = 'api/exercises'
  }

  getExercises(): Observable<any[]> {
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    // return this.http.get<Product[]>(`${this.myAppUri}${this.myApiUri}`, {headers: headers});
    return this.http.get<any[]>(`${this.myAppUri}${this.myApiUri}`)
  }

  saveTrain(usuario: string, ejerciciosSeleccionados: Exercise[]): Observable<any>{
    const data = { usuario, ejerciciosSeleccionados };
    return this.http.post(`${this.myAppUri}${this.myApiUri}/entrenamiento`, data);
  }
}
