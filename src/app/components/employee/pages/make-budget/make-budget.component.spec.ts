import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeBudgetComponent } from './make-budget.component';

describe('MakeBudgetComponent', () => {
  let component: MakeBudgetComponent;
  let fixture: ComponentFixture<MakeBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeBudgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
