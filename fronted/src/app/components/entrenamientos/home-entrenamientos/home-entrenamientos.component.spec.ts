import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEntrenamientosComponent } from './home-entrenamientos.component';

describe('HomeEntrenamientosComponent', () => {
  let component: HomeEntrenamientosComponent;
  let fixture: ComponentFixture<HomeEntrenamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEntrenamientosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeEntrenamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
