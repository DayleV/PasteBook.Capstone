import { TestBed } from '@angular/core/testing';

import { NewsfeedapiService } from './newsfeedapi.service';

describe('NewsfeedapiService', () => {
  let service: NewsfeedapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsfeedapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
