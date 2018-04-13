import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonProfitAccountComponent } from './non-profit-account.component';

describe('NonProfitAccountComponent', () => {
  let component: NonProfitAccountComponent;
  let fixture: ComponentFixture<NonProfitAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonProfitAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonProfitAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
