import { TestBed } from '@angular/core/testing';

import { EndMaintenceService } from './end-maintence.service';

describe('EndMaintenceService', () => {
  let service: EndMaintenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndMaintenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
