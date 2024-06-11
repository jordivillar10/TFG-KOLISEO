import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-imc',
  standalone: true,
  imports: [NavbarComponent, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './imc.component.html',
  styleUrl: './imc.component.css'
})
export class ImcComponent {
  calculadoraForm: FormGroup;
  mostrarIMC: boolean = false;
  imc: number = 0;

  constructor(private fb: FormBuilder) {
    this.calculadoraForm = this.fb.group({
      weight: ['', [Validators.required, Validators.max(250), Validators.min(30), Validators.maxLength(6), Validators.pattern(/^\d+$/)]],
      altura: ['', [Validators.required, Validators.max(400), Validators.min(50), Validators.maxLength(3), Validators.pattern(/^\d+$/)]],
    });
  }

  get weight() {
    return this.calculadoraForm.get('weight');
  }

  get altura() {
    return this.calculadoraForm.get('altura');
  }
  
  onSubmit() {
    const weight = this.calculadoraForm.value.weight;
    const altura = this.calculadoraForm.value.altura;

    const alturaEnMetros = altura / 100;

    const imc = weight / (alturaEnMetros * alturaEnMetros);

    this.imc = parseFloat(imc.toFixed(2));

    this.mostrarIMC = true;
  }
  
}
