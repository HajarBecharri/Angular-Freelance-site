import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImboxClientComponent } from './imbox-client.component';

describe('ImboxClientComponent', () => {
  let component: ImboxClientComponent;
  let fixture: ComponentFixture<ImboxClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImboxClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImboxClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
