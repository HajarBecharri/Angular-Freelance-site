import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SusheaderComponent } from './susheader.component';

describe('SusheaderComponent', () => {
  let component: SusheaderComponent;
  let fixture: ComponentFixture<SusheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SusheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SusheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
