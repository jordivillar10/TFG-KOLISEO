import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmPesomuertoComponent } from './rm-pesomuerto.component';

describe('RmPesomuertoComponent', () => {
  let component: RmPesomuertoComponent;
  let fixture: ComponentFixture<RmPesomuertoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RmPesomuertoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RmPesomuertoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
