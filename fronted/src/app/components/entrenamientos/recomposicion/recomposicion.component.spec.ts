import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomposicionComponent } from './recomposicion.component';

describe('RecomposicionComponent', () => {
  let component: RecomposicionComponent;
  let fixture: ComponentFixture<RecomposicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomposicionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecomposicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
