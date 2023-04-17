import { TestBed } from '@angular/core/testing';

import { CmsServiceService } from './cms-service.service';

describe('CmsServiceService', () => {
  let service: CmsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
