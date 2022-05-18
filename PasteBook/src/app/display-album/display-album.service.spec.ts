import { TestBed } from '@angular/core/testing';

import { DisplayAlbumService } from './display-album.service';

describe('DisplayAlbumService', () => {
  let service: DisplayAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayAlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
