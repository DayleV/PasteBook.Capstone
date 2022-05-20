import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFriendComponent } from './home-friend.component';

describe('HomeFriendComponent', () => {
  let component: HomeFriendComponent;
  let fixture: ComponentFixture<HomeFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
