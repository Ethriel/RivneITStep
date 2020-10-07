import { TestBed } from '@angular/core/testing';

import { MystatService } from './mystat.service';

describe('MystatService', () => {
  let service: MystatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MystatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
