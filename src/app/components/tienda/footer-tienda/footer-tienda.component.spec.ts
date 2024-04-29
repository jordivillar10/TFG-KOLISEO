import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterTiendaComponent } from './footer-tienda.component';

describe('FooterTiendaComponent', () => {
  let component: FooterTiendaComponent;
  let fixture: ComponentFixture<FooterTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterTiendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
