import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorTiendaComponent } from './buscador-tienda.component';

describe('BuscadorTiendaComponent', () => {
  let component: BuscadorTiendaComponent;
  let fixture: ComponentFixture<BuscadorTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorTiendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscadorTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
