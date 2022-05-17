import { TestBed } from '@angular/core/testing';

import { EditProfileInformationService } from './edit-profile-information.service';

describe('EditProfileInformationService', () => {
  let service: EditProfileInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditProfileInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
