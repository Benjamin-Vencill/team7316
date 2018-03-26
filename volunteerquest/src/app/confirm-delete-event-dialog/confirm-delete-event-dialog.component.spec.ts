import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteEventDialogComponent } from './confirm-delete-event-dialog.component';

describe('ConfirmDeleteEventDialogComponent', () => {
  let component: ConfirmDeleteEventDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteEventDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteEventDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
