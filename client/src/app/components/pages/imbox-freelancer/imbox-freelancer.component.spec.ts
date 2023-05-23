import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImboxFreelancerComponent } from './imbox-freelancer.component';

describe('ImboxFreelancerComponent', () => {
  let component: ImboxFreelancerComponent;
  let fixture: ComponentFixture<ImboxFreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImboxFreelancerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImboxFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
