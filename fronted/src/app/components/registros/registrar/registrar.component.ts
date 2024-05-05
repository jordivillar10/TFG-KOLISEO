import { Component } from '@angular/core';
import { HistorialComponent } from '../historial/historial.component';
import { RouterLink } from '@angular/router';
import { ExerciseService } from '../../../services/exercise.service';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [HistorialComponent, RouterLink, NgIf, NgFor],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  exercisesPrueba: any[] = [];


  constructor(
    private _exerciseService: ExerciseService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    console.log("probando eventos ciclo vida");
 
    this._exerciseService
      .getExercises()
      .subscribe(data => { 
        
        this.exercisesPrueba = data;
        console.log("exercisesPrueba->", this.exercisesPrueba);
       //  console.log(typeof(this.productosPrueba[0].id)); 
      });
 
  }

  miFuncion(): void {
    // Ejemplo: Devolver true si exercisesPrueba no está vacío
    this.exercisesPrueba.forEach((element: any) => {
      element.seleccionado = !element.seleccionado;
    });
  }
  ejerciciosSeleccionados: any[] = [];

  // Esta función se llama cuando se hace clic en un ejercicio
  mostrarEjercicio(ejercicio: any) {
    if (!this.ejerciciosSeleccionados.includes(ejercicio)) {
      this.ejerciciosSeleccionados.push(ejercicio);
    }
  }

  // Esta función se llama cuando se hace clic en el botón de cerrar
  quitarEjercicio(ejercicio: any) {
    this.ejerciciosSeleccionados = this.ejerciciosSeleccionados.filter(e => e !== ejercicio);
    ejercicio.campos = [];
  }

  // Función para verificar si un ejercicio está seleccionado o no
  estaSeleccionado(ejercicio: any) {
    return this.ejerciciosSeleccionados.includes(ejercicio);
  }

  // Función para agregar campos a un ejercicio
  agregarCampos(ejercicio: any) {
    if (!ejercicio.campos) {
      ejercicio.campos = []; // Inicializar el arreglo de campos si no existe
    }
    ejercicio.campos.push({ repeticiones: '', kg: '' }); // Agregar un nuevo campo
  }

  borrarCampo(ejercicio: any) {
    if (ejercicio.campos && ejercicio.campos.length > 0) {
      ejercicio.campos.pop(); // Eliminar el último campo
    }
  }

  guardarEntrenamiento() {
    // Hacer una solicitud HTTP para guardar los ejercicios seleccionados
    this.http.post<any>('URL_de_tu_API', this.ejerciciosSeleccionados)
      .subscribe(response => {
        console.log('Entrenamiento guardado correctamente:', response);
        // Aquí podrías mostrar un mensaje de éxito o redirigir a otra página
      }, error => {
        console.error('Error al guardar el entrenamiento:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      });
  }

}
