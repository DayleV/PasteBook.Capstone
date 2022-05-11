import { TestBed } from '@angular/core/testing';

import { UserfriendService } from './userfriend.service';

describe('UserfriendService', () => {
  let service: UserfriendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserfriendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
