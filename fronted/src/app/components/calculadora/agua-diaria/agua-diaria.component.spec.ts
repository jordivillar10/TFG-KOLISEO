import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AguaDiariaComponent } from './agua-diaria.component';

describe('AguaDiariaComponent', () => {
  let component: AguaDiariaComponent;
  let fixture: ComponentFixture<AguaDiariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AguaDiariaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AguaDiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
