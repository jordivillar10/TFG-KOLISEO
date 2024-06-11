import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmSentadillaComponent } from './rm-sentadilla.component';

describe('RmSentadillaComponent', () => {
  let component: RmSentadillaComponent;
  let fixture: ComponentFixture<RmSentadillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RmSentadillaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RmSentadillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
