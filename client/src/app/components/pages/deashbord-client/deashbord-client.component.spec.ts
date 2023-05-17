import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeashbordClientComponent } from './deashbord-client.component';

describe('DeashbordClientComponent', () => {
  let component: DeashbordClientComponent;
  let fixture: ComponentFixture<DeashbordClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeashbordClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeashbordClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
