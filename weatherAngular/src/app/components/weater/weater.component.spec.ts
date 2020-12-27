import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaterComponent } from './weater.component';

describe('WeaterComponent', () => {
  let component: WeaterComponent;
  let fixture: ComponentFixture<WeaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
