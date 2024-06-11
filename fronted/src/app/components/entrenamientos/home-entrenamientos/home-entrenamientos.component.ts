import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { VolumenComponent } from '../volumen/volumen.component';
import { DeficitComponent } from '../deficit/deficit.component';
import { RecomposicionComponent } from '../recomposicion/recomposicion.component';
import { FuerzaComponent } from '../fuerza/fuerza.component';
import { ResistenciaComponent } from '../resistencia/resistencia.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-home-entrenamientos',
  standalone: true,
  imports: [NavbarComponent, VolumenComponent, DeficitComponent, RecomposicionComponent, FuerzaComponent, ResistenciaComponent, FooterComponent],
  templateUrl: './home-entrenamientos.component.html',
  styleUrl: './home-entrenamientos.component.css'
})
export class HomeEntrenamientosComponent {

}
