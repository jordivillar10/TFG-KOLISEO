import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatinaDosisComponent } from './creatina-dosis.component';

describe('CreatinaDosisComponent', () => {
  let component: CreatinaDosisComponent;
  let fixture: ComponentFixture<CreatinaDosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatinaDosisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatinaDosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
