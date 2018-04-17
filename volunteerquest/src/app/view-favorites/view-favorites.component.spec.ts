import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFavoritesComponent } from './view-favorites.component';

describe('ViewFavoritesComponent', () => {
  let component: ViewFavoritesComponent;
  let fixture: ComponentFixture<ViewFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
