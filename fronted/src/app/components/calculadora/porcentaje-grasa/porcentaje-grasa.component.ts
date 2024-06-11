import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-porcentaje-grasa',
  standalone: true,
  imports: [NavbarComponent, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './porcentaje-grasa.component.html',
  styleUrl: './porcentaje-grasa.component.css'
})
export class PorcentajeGrasaComponent {
  calculadoraForm: FormGroup;
  mostrarGrasa: boolean = false;
  porcentajeGrasa: number = 0;

  constructor(private fb: FormBuilder) {
    this.calculadoraForm = this.fb.group({
      edad: ['', [Validators.required, Validators.max(99), Validators.min(10), Validators.maxLength(2), Validators.pattern(/^\d+$/)]],
      weight: ['', [Validators.required, Validators.max(250), Validators.min(30), Validators.maxLength(6), Validators.pattern(/^\d+$/)]],
      altura: ['', [Validators.required, Validators.max(400), Validators.min(50), Validators.maxLength(3), Validators.pattern(/^\d+$/)]],
      sexo: ['', Validators.required],
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

  get sexo() {
    return this.calculadoraForm.get('sexo');
  }

  calcularGrasaCorporal({ sexo, edad, weight, altura }: any): number {
    const alturaEnMetros = altura / 100;
    const imc = weight / (alturaEnMetros * alturaEnMetros);

    let porcentajeGrasa: number;

    if (sexo === 'h') {
      porcentajeGrasa = (1.20 * imc) + (0.23 * edad) - 16.2;
    } else {
      porcentajeGrasa = (1.20 * imc) + (0.23 * edad) - 5.4;
    }

    return parseFloat(porcentajeGrasa.toFixed(1));
  }


  onSubmit() {
    if (this.calculadoraForm.valid) {
      const formValues = this.calculadoraForm.value;
      this.porcentajeGrasa = this.calcularGrasaCorporal(formValues);
      this.mostrarGrasa = true;
    }
  }
  
}

