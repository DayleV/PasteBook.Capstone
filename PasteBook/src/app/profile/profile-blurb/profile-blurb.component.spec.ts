import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBlurbComponent } from './profile-blurb.component';

describe('ProfileBlurbComponent', () => {
  let component: ProfileBlurbComponent;
  let fixture: ComponentFixture<ProfileBlurbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileBlurbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBlurbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
