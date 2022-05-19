import { TestBed } from '@angular/core/testing';

import { ChangeaccountinfoService } from './changeaccountinfo.service';

describe('ChangeaccountinfoService', () => {
  let service: ChangeaccountinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeaccountinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
