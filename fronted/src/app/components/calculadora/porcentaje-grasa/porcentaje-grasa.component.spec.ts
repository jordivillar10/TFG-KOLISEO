import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorcentajeGrasaComponent } from './porcentaje-grasa.component';

describe('PorcentajeGrasaComponent', () => {
  let component: PorcentajeGrasaComponent;
  let fixture: ComponentFixture<PorcentajeGrasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorcentajeGrasaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PorcentajeGrasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
