import { TestBed } from '@angular/core/testing';

import { LogbookMystatService } from './logbook-mystat.service';

describe('LogbookMystatService', () => {
  let service: LogbookMystatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogbookMystatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
