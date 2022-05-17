import { TestBed } from '@angular/core/testing';

import { EditAccountInformationService } from './edit-account-information.service';

describe('EditAccountInformationService', () => {
  let service: EditAccountInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditAccountInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
