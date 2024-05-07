import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCheckComponent } from './input-check.component';

describe('InputCheckComponent', () => {
  let component: InputCheckComponent;
  let fixture: ComponentFixture<InputCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
