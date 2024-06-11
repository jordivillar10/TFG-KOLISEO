import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-alcohol',
  standalone: true,
  imports: [NavbarComponent, FormsModule, NgIf, ReactiveFormsModule, FooterComponent],
  templateUrl: './alcohol.component.html',
  styleUrl: './alcohol.component.css'
})
export class AlcoholComponent {
  calculadoraForm: FormGroup;
  mostrarCalorias: boolean = false;
  caloriasNecesarias: number = 0;

  constructor(private fb: FormBuilder) {
    this.calculadoraForm = this.fb.group({
      cantidad: ['', [Validators.required, Validators.max(8000), Validators.min(2), Validators.maxLength(4), Validators.pattern(/^\d+$/)]],
      graduacion: ['', [Validators.required, Validators.max(100), Validators.min(0), Validators.maxLength(4), Validators.pattern(/^\d+$/)]],

    });
  }

  get cantidad() {
    return this.calculadoraForm.get('cantidad');
  }

  get graduacion() {
    return this.calculadoraForm.get('graduacion');
  }

  calcularCaloriasAlcohol() {
    const cantidad = this.calculadoraForm.value.cantidad;
    const graduacion = this.calculadoraForm.value.graduacion;

    const gramosEtanol = ( graduacion * cantidad * 0.8) / 100;

    const calorias = gramosEtanol * 7;

    this.caloriasNecesarias = parseFloat(calorias.toFixed(2));

    this.mostrarCalorias = true;
}

  onSubmit() {
    this.calcularCaloriasAlcohol();
  }
}
