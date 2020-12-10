import { TestBed } from '@angular/core/testing';

import { HalladmincommentService } from './halladmincomment.service';

describe('HalladmincommentService', () => {
  let service: HalladmincommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HalladmincommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
