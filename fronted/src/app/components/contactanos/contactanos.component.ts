import { Component, NgModule } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { FormsModule, NgModelGroup } from '@angular/forms';


@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css'
})
export class ContactanosComponent {
  name: string = '';
  email: string = '';
  asunto: string = '';
  message: string = '';

  constructor(private messageService: MessageService) { }

  enviarCorreo() {
    const formulario = {
      name: this.name,
      email: this.email,
      asunto: this.asunto,
      message: this.message
    };
    console.log(formulario);
    this.messageService.enviarCorreo(formulario).subscribe(
      response => {
        console.log('Correo enviado correctamente', response);
        // Muestra un mensaje de éxito al usuario
      },
      error => {
        console.error('Error al enviar el correo', error);
        // Muestra un mensaje de error al usuario
      }
    );
  }
}
