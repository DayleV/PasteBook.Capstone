import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserfriendComponent } from './userfriend.component';

describe('UserfriendComponent', () => {
  let component: UserfriendComponent;
  let fixture: ComponentFixture<UserfriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserfriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserfriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
