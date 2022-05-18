import { TestBed } from '@angular/core/testing';

import { PostDisplayService } from './post-display.service';

describe('PostDisplayService', () => {
  let service: PostDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
