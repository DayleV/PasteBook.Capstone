import { TestBed } from '@angular/core/testing';

import { DisplayFriendsService } from './display-friends.service';

describe('DisplayFriendsService', () => {
  let service: DisplayFriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayFriendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
