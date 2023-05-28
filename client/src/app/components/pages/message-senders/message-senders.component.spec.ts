import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSendersComponent } from './message-senders.component';

describe('MessageSendersComponent', () => {
  let component: MessageSendersComponent;
  let fixture: ComponentFixture<MessageSendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageSendersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageSendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
