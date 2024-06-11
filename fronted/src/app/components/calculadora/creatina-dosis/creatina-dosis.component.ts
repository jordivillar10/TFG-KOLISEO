import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NgIf } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-creatina-dosis',
  standalone: true,
  imports: [NavbarComponent, FormsModule, NgIf, ReactiveFormsModule, FooterComponent],
  templateUrl: './creatina-dosis.component.html',
  styleUrl: './creatina-dosis.component.css'
})
export class CreatinaDosisComponent {
  calculadoraForm: FormGroup;
  mostrarResultado: boolean = false;
  resultadoCarga: string = '';
  resultadoMantenimiento: string = '';

  constructor(private fb: FormBuilder) {
    this.calculadoraForm = this.fb.group({
      weight: ['', [Validators.required, Validators.max(250), Validators.min(30), Validators.maxLength(6), Validators.pattern(/^\d+$/)]],
      carga: ['', Validators.required]
    });
  }

  get weight() {
    return this.calculadoraForm.get('weight');
  }
  get carga() {
    return this.calculadoraForm.get('carga');
  }
  
  onSubmit() {
    const weight = this.calculadoraForm.value.weight;
    const carga = this.calculadoraForm.value.carga === 'si';
    
    const creatinaMantenimiento = weight * 0.1; 
    const creatinaCarga = creatinaMantenimiento * 3; 

    this.resultadoMantenimiento = `${creatinaMantenimiento.toFixed(1)} g`;
    if (carga) {
      this.resultadoCarga = `${creatinaCarga.toFixed(1)} g`;
    }

    this.mostrarResultado = true;
  }

}
