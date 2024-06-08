import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Formulario } from '../interfaces/formulario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private myAppUri: string;
  private myApiUri: string;

  constructor(private http: HttpClient) { 
    this.myAppUri = environment.endpoint;
    this.myApiUri = 'api/users'
  }

  enviarCorreo(formulario: Formulario): Observable<any> {
    console.log("services",formulario);
    
    return this.http.post(`${this.myAppUri}${this.myApiUri}/contactanos`, formulario);
    
;  }
}
