import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescueServiceComponent } from './rescue-service.component';

describe('RescueServiceComponent', () => {
  let component: RescueServiceComponent;
  let fixture: ComponentFixture<RescueServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RescueServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RescueServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
