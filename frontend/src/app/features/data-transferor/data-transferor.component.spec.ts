import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTransferorComponent } from './data-transferor.component';

describe('DataTransferorComponent', () => {
  let component: DataTransferorComponent;
  let fixture: ComponentFixture<DataTransferorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTransferorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataTransferorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
