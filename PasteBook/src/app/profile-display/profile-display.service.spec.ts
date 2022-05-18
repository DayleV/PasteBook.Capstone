import { TestBed } from '@angular/core/testing';

import { ProfileDisplayService } from './profile-display.service';

describe('ProfileDisplayService', () => {
  let service: ProfileDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
