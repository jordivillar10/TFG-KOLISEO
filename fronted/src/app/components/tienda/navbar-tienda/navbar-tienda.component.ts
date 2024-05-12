// Importaciones de módulos y clases necesarios
import { NgClass } from '@angular/common'; // Importa la directiva NgClass desde el módulo @angular/common
import { Component } from '@angular/core'; // Importa las clases Component, ElementRef y ViewChild desde el módulo @angular/core
import { FiltradoService } from '../../../services/filtrado.service';

// Decorador @Component que define metadatos para el componente
@Component({
  selector: 'app-navbar-tienda', // Selector CSS que define el nombre del componente en la plantilla HTML
  standalone: true, // Metadato personalizado (podría ser específico del proyecto)
  imports: [NgClass], // Importa el módulo NgClass dentro del componente (esto no es común)
  templateUrl: './navbar-tienda.component.html', // Ruta al archivo de plantilla HTML del componente
  styleUrls: ['./navbar-tienda.component.css'] // Rutas a los archivos de estilos CSS del componente
})
export class NavbarTiendaComponent {
  navbarExpanded: boolean = false; // Propiedad que almacena el estado de expansión del navbar
  dropdownVisible: { [key: string]: boolean } = {}; // Objeto que rastrea qué menús desplegables están visibles

  constructor(private filtradoService: FiltradoService) { }

  seleccionarCategoria(categoriaId: number) {
    this.filtradoService.actualizarCategoriaSeleccionada(categoriaId);
  }

  mostrarTodosLosProductos() {
    this.filtradoService.mostrarTodosLosProductos();
  }

  // Método que muestra un menú desplegable específico
  showDropdown(dropdownId: string) {
    this.dropdownVisible[dropdownId] = true; // Establece el valor del menú desplegable específico en true
  }

  // Método que oculta un menú desplegable específico
  hideDropdown(dropdownId: string) {
    this.dropdownVisible[dropdownId] = false; // Establece el valor del menú desplegable específico en false
  }

  // Método que cancela la ocultación de un menú desplegable cuando se pasa el cursor sobre él
  cancelHide() {
    clearTimeout(this.hideTimeout); // Limpia el temporizador utilizado para ocultar el menú desplegable
  }

  private hideTimeout: any; // Propiedad privada que almacena el identificador del temporizador utilizado para ocultar un menú desplegable



}
