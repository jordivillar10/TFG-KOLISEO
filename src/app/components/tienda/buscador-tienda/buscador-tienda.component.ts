import { Component, TemplateRef, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buscador-tienda',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './buscador-tienda.component.html',
  styleUrl: './buscador-tienda.component.css'
})
export class BuscadorTiendaComponent {
  private offcanvasService = inject(NgbOffcanvas);

	openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'start' });
	}
}
