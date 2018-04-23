import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSysComponent } from './mail-sys.component';

describe('MailSysComponent', () => {
  let component: MailSysComponent;
  let fixture: ComponentFixture<MailSysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailSysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
