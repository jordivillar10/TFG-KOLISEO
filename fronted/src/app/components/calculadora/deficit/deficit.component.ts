import { Component, NgModuleRef } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';



@Component({
  selector: 'app-deficit',
  standalone: true,
  imports: [NavbarComponent, FormsModule, NgIf, ReactiveFormsModule, FooterComponent],
  templateUrl: './deficit.component.html',
  styleUrl: './deficit.component.css'
})
export class DeficitComponent {
  calculadoraForm: FormGroup;
  mostrarCalorias: boolean = false;
  caloriasNecesarias: number = 0;

  constructor(private fb: FormBuilder) {
    this.calculadoraForm = this.fb.group({
      edad: ['', [Validators.required, Validators.max(99), Validators.min(10), Validators.maxLength(2), Validators.pattern(/^\d+$/)]],
      weight: ['', [Validators.required, Validators.max(250), Validators.min(30), Validators.maxLength(6), Validators.pattern(/^\d+$/)]],
      altura: ['', [Validators.required, Validators.max(400), Validators.min(50), Validators.maxLength(3), Validators.pattern(/^\d+$/)]],
      grasa: ['',[ Validators.max(100), Validators.min(0), Validators.maxLength(5), Validators.pattern(/^\d+$/)]],
      sexo: ['', Validators.required],
      nivelActividad: ['', Validators.required]
    });
  }

  get edad() {
    return this.calculadoraForm.get('edad');
  }
  get weight() {
    return this.calculadoraForm.get('weight');
  }

  get altura() {
    return this.calculadoraForm.get('altura');
  }
  get grasa() {
    return this.calculadoraForm.get('grasa');
  }
  
  get sexo() {
    return this.calculadoraForm.get('sexo');
  }

  get nivelActividad() {
    return this.calculadoraForm.get('nivelActividad');
  }
  
  onSubmit() {
    if (this.calculadoraForm.valid) {
      console.log(this.calculadoraForm.value);
      const formValues = this.calculadoraForm.value;
      this.caloriasNecesarias = this.calcularCalorias(formValues);
      this.mostrarCalorias = true; 
    } else {
      console.log('Formulario no válido');
    }
  }
  calcularCalorias({ sexo, edad, weight, altura, nivelActividad, grasa }: any): number {
    let tmb: number;
    if (sexo === 'h') {
      tmb = 88.36 + (13.4 * weight) + (4.8 * altura) - (5.7 * edad);
    } else {
      tmb = 447.6 + (9.2 * weight) + (3.1 * altura) - (4.3 * edad);
    }

    let factorActividad: number;
    switch (nivelActividad) {
      case 'sedentario':
        factorActividad = 1.2;
        break;
      case 'ligera':
        factorActividad = 1.375;
        break;
      case 'moderada':
        factorActividad = 1.55;
        break;
      case 'intensa':
        factorActividad = 1.725;
        break;
      case 'muy intensa':
        factorActividad = 1.9;
        break;
      default:
        factorActividad = 1.2;
    }
    const caloriasMantenimiento = tmb * factorActividad;
    const caloriasPerderPeso = caloriasMantenimiento - 500;
    return caloriasPerderPeso;
  }
}
