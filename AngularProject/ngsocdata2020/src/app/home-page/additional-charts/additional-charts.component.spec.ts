import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalChartsComponent } from './additional-charts.component';

describe('AdditionalChartsComponent', () => {
  let component: AdditionalChartsComponent;
  let fixture: ComponentFixture<AdditionalChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
