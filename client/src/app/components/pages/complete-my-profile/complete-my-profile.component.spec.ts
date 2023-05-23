import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteMyProfileComponent } from './complete-my-profile.component';

describe('CompleteMyProfileComponent', () => {
  let component: CompleteMyProfileComponent;
  let fixture: ComponentFixture<CompleteMyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteMyProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
