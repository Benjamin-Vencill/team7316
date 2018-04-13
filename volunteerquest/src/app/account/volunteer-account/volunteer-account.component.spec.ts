import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerAccountComponent } from './volunteer-account.component';

describe('VolunteerAccountComponent', () => {
  let component: VolunteerAccountComponent;
  let fixture: ComponentFixture<VolunteerAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
