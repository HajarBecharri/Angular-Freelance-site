import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerGmailComponent } from './freelancer-gmail.component';

describe('FreelancerGmailComponent', () => {
  let component: FreelancerGmailComponent;
  let fixture: ComponentFixture<FreelancerGmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancerGmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerGmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
