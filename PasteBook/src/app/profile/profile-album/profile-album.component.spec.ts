import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAlbumComponent } from './profile-album.component';

describe('ProfileAlbumComponent', () => {
  let component: ProfileAlbumComponent;
  let fixture: ComponentFixture<ProfileAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAlbumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
