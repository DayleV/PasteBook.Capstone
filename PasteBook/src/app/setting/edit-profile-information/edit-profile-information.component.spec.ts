import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileInformationComponent } from './edit-profile-information.component';

describe('EditProfileInformationComponent', () => {
  let component: EditProfileInformationComponent;
  let fixture: ComponentFixture<EditProfileInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
