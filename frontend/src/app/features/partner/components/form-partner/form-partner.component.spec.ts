import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPartnerComponent } from './form-partner.component';

describe('FormPartnerComponent', () => {
  let component: FormPartnerComponent;
  let fixture: ComponentFixture<FormPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPartnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
