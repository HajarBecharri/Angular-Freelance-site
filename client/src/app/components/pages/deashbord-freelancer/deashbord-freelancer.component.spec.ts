import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeashbordFreelancerComponent } from './deashbord-freelancer.component';

describe('DeashbordFreelancerComponent', () => {
  let component: DeashbordFreelancerComponent;
  let fixture: ComponentFixture<DeashbordFreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeashbordFreelancerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeashbordFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
