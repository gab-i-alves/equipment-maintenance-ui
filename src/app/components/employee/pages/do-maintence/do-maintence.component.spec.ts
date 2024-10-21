import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoMaintenceComponent } from './do-maintence.component';

describe('DoMaintenceComponent', () => {
  let component: DoMaintenceComponent;
  let fixture: ComponentFixture<DoMaintenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoMaintenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoMaintenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
