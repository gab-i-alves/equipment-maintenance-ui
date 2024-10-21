import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditEmployeeComponent } from './new-edit-employee.component';

describe('NewEditEmployeeComponent', () => {
  let component: NewEditEmployeeComponent;
  let fixture: ComponentFixture<NewEditEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEditEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewEditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
