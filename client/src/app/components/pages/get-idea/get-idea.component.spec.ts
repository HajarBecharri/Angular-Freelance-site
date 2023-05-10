import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetIdeaComponent } from './get-idea.component';

describe('GetIdeaComponent', () => {
  let component: GetIdeaComponent;
  let fixture: ComponentFixture<GetIdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetIdeaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
