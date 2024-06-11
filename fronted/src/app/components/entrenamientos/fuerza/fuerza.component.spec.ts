import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuerzaComponent } from './fuerza.component';

describe('FuerzaComponent', () => {
  let component: FuerzaComponent;
  let fixture: ComponentFixture<FuerzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuerzaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuerzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
