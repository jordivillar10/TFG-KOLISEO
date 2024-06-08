import { Component, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-entrenamientos',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './entrenamientos.component.html',
  styleUrl: './entrenamientos.component.css'
})
export class EntrenamientosComponent {

  constructor(private elementRef: ElementRef) { }
  scrollToFeatures() {
    const featuresSection = this.elementRef.nativeElement.querySelector('#features');
    featuresSection.scrollIntoView({ behavior: 'smooth' });
  }
}
