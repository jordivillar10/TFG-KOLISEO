import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraHechaComponent } from './compra-hecha.component';

describe('CompraHechaComponent', () => {
  let component: CompraHechaComponent;
  let fixture: ComponentFixture<CompraHechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompraHechaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompraHechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
