import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-pasos',
  standalone: true,
  imports: [NavbarComponent, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './pasos.component.html',
  styleUrl: './pasos.component.css'
})
export class PasosComponent {
  calculadoraForm: FormGroup;
  mostrarCalorias: boolean = false;
  caloriasQuemadas: number = 0;

  constructor(private fb: FormBuilder) {
    this.calculadoraForm = this.fb.group({
      npasos: ['', [Validators.required, Validators.max(90000), Validators.min(1), Validators.maxLength(6), Validators.pattern(/^\d+$/)]],
      altura: ['', [Validators.required, Validators.max(400), Validators.min(50), Validators.maxLength(3), Validators.pattern(/^\d+$/)]],
      ritmoAndando: ['', Validators.required]
    });
  }

  get npasos() {
    return this.calculadoraForm.get('npasos');
  }

  get altura() {
    return this.calculadoraForm.get('altura');
  }

  get ritmoAndando() {
    return this.calculadoraForm.get('ritmoAndando');
  }
  
  onSubmit() {
    if (this.calculadoraForm.valid) {
      const formValues = this.calculadoraForm.value;
      this.caloriasQuemadas = this.calcularCalorias(formValues.npasos, formValues.ritmoAndando);
      this.mostrarCalorias = true;
    }
  }
  
  calcularCalorias(npasos: number, ritmoAndando: string): number {
    // Lógica para calcular las calorías
    let factorCalorico = 0;
    switch (ritmoAndando) {
      case 'bajo':
        factorCalorico = 0.03;
        break;
      case 'medio':
        factorCalorico = 0.045;
        break;
      case 'alto':
        factorCalorico = 0.06;
        break;
      case 'muyalto':
        factorCalorico = 0.085;
        break;
      default:
        break;
    }
    return npasos * factorCalorico;
  }
}
