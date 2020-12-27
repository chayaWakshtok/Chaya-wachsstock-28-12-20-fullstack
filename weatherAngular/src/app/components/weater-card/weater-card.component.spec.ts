import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaterCardComponent } from './weater-card.component';

describe('WeaterCardComponent', () => {
  let component: WeaterCardComponent;
  let fixture: ComponentFixture<WeaterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeaterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
