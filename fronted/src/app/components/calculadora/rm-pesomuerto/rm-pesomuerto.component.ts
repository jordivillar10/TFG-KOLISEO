import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-rm-pesomuerto',
  standalone: true,
  imports: [NavbarComponent, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './rm-pesomuerto.component.html',
  styleUrl: './rm-pesomuerto.component.css'
})
export class RmPesomuertoComponent {
  calculadoraForm: FormGroup;
  mostrarRM: boolean = false;
  rm: number = 0;

  constructor(private fb: FormBuilder) {
    this.calculadoraForm = this.fb.group({
      weight: ['', [Validators.required, Validators.max(900), Validators.min(1), Validators.maxLength(5), Validators.pattern(/^\d+$/)]],
      repes: ['', [Validators.required, Validators.max(100), Validators.min(1), Validators.maxLength(3), Validators.pattern(/^\d+$/)]],
    });
  }

  get weight() {
    return this.calculadoraForm.get('weight');
  }

  get repes() {
    return this.calculadoraForm.get('repes');
  }
  
  onSubmit() {
    const weight = this.calculadoraForm.value.weight;
    const repes = this.calculadoraForm.value.repes;

    const rm = (102.78 + 2.78 * repes) / 100 * weight;

    this.rm = parseFloat(rm.toFixed(2));

    this.mostrarRM = true;
  }

}
