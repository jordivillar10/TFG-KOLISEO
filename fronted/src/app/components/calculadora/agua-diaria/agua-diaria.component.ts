import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NgIf } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-agua-diaria',
  standalone: true,
  imports: [NavbarComponent, FormsModule, NgIf, ReactiveFormsModule, FooterComponent],
  templateUrl: './agua-diaria.component.html',
  styleUrl: './agua-diaria.component.css'
})
export class AguaDiariaComponent {
  calculadoraForm: FormGroup;
  mostrarAgua: boolean = false;
  aguaNecesaria: number = 0;

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
      const valores = this.calculadoraForm.value;
      this.aguaNecesaria = this.aguaDiaria(valores);
      this.mostrarAgua = true;
    }
  }
  aguaDiaria({ sexo, edad, weight, altura, nivelActividad, grasa }: any): number {
    // Fórmula para calcular el agua diaria en litros
    let waterIntake = weight * 0.033;

    // Ajuste por nivel de actividad
    switch (nivelActividad) {
      case 'sedentario':
        waterIntake *= 1;
        break;
      case 'moderado':
        waterIntake *= 1.2;
        break;
      case 'activo':
        waterIntake *= 1.4;
        break;
      case 'muy activo':
        waterIntake *= 1.6;
        break;
    }

    // Ajuste por sexo (por ejemplo, mujeres podrían necesitar un poco menos)
    if (sexo === 'female') {
      waterIntake *= 0.9;
    }

    
  return parseFloat(waterIntake.toFixed(1));
  }
  
}
