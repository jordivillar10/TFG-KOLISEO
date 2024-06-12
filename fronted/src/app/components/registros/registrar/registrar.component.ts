import { Component, Output, EventEmitter, NgModule } from '@angular/core';
import { HistorialComponent } from '../historial/historial.component';
import { Router, RouterLink } from '@angular/router';
import { ExerciseService } from '../../../services/exercise.service';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Exercise } from '../../../interfaces/exercises';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [HistorialComponent, RouterLink, NgIf, NgFor, FormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  private userSubscription: Subscription;
  user: any ;
  exercises: Exercise[] = [];
  exercisesFiltrados: Exercise[] = [];
  ejerciciosSeleccionados: Exercise[] = [];
  constructor(
    private _exerciseService: ExerciseService,
    private userService: UsersService,
    private toast: ToastrService,
    private router: Router
  ) {

    this.userSubscription = this.userService.userData$.subscribe(user => {
      this.user = user;
    });
  }

  @Output() cambioBusqueda = new EventEmitter<string>();
  onSearchInput(event: any){
    const terminoBusqueda = event.target.value;
    this.cambioBusqueda.emit(terminoBusqueda)
  }

  ngOnInit() {
    this._exerciseService
      .getExercises()
      .subscribe(data => {  
        this.exercises = data;
        this.exercisesFiltrados = data;
        console.log("exercises->", this.exercises);    
       //  console.log(typeof(this.productosPrueba[0].id)); 
       });
    this.userSubscription = this.userService.userData$.subscribe(user => {
      this.user = user;
      // console.log(user);
      
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }


  miFuncion(): void {
    // Ejemplo: Devolver true si exercises no está vacío
    this.exercises.forEach((element: any) => {
      element.seleccionado = !element.seleccionado;
      console.log("ejericios seleccionados", this.exercisesFiltrados);
      
      
    });
  }
  // ejerciciosSeleccionados: Exercise[] = [];

  // Esta función se llama cuando se hace clic en un ejercicio
  mostrarEjercicio(ejercicio: any) {
    if (!this.ejerciciosSeleccionados.includes(ejercicio)) {
      this.ejerciciosSeleccionados.push(ejercicio);
      console.log(this.ejerciciosSeleccionados);
      
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
  agregarCampos(ejercicio: Exercise) {
    if (!ejercicio.campos) {
      ejercicio.campos = []; // Inicializar el array de campos si no existe
    }
    ;
    ejercicio.campos.push({ repeticiones: '', peso: '' }); // Agregar un nuevo campo

  }

  borrarCampo(ejercicio: any) {
    if (ejercicio.campos && ejercicio.campos.length > 0) {
      ejercicio.campos.pop(); // eliminar el ultimo campo
    }
  }

  guardarEntrenamiento() {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    // Hacer una solicitud HTTP para guardar los ejercicios seleccionados
    this._exerciseService.saveTrain(this.user, this.ejerciciosSeleccionados).subscribe(
      response => {
        this.toast.success('Entrenamiento Guardado correctamente', 'Éxito');
        // Aquí podrías mostrar un mensaje de éxito o redirigir a otra página
      }, error => {
        this.toast.error('Error al guardar el entrenamiento', 'error');
        console.error('Error al guardar el entrenamiento:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      });
  }
  
  terminoBusqueda: string = '';
  filtrarProductos() {
    const terminoNormalizado = this.normalizarTexto(this.terminoBusqueda);
  
    if (terminoNormalizado.trim() === '') {
      this.exercisesFiltrados = this.exercises;
    } else {
      this.exercisesFiltrados = this.exercises.filter(exercises =>
        this.normalizarTexto(exercises.name).includes(terminoNormalizado)
      );
    }
  }
  normalizarTexto(texto: string): string {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  get hayEjerciciosSeleccionados(): boolean {
    return this.ejerciciosSeleccionados.length > 0;
  }

  
}
