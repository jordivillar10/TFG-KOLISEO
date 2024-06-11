import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [NavbarComponent, RouterLink, FooterComponent],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent {

}
