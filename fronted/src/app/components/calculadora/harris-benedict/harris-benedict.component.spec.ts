import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarrisBenedictComponent } from './harris-benedict.component';

describe('HarrisBenedictComponent', () => {
  let component: HarrisBenedictComponent;
  let fixture: ComponentFixture<HarrisBenedictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarrisBenedictComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HarrisBenedictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
