import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmPressbancaComponent } from './rm-pressbanca.component';

describe('RmPressbancaComponent', () => {
  let component: RmPressbancaComponent;
  let fixture: ComponentFixture<RmPressbancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RmPressbancaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RmPressbancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
