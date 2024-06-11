import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-rm-sentadilla',
  standalone: true,
  imports: [NavbarComponent, FormsModule, NgIf, ReactiveFormsModule, FooterComponent],
  templateUrl: './rm-sentadilla.component.html',
  styleUrl: './rm-sentadilla.component.css'
})
export class RmSentadillaComponent {
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
    
    const rm = weight * (1 + repes / 30);

    this.rm = parseFloat(rm.toFixed(2));

    this.mostrarRM = true;
  }

}
