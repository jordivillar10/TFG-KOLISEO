import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent {

}
