import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTiendaComponent } from './dashboard-tienda.component';

describe('DashboardTiendaComponent', () => {
  let component: DashboardTiendaComponent;
  let fixture: ComponentFixture<DashboardTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTiendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
