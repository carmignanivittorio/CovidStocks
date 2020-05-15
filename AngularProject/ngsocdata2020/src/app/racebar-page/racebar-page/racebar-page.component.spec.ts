import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacebarPageComponent } from './racebar-page.component';

describe('RacebarPageComponent', () => {
  let component: RacebarPageComponent;
  let fixture: ComponentFixture<RacebarPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacebarPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacebarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
