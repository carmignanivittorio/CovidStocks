import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceButtonsComponent } from './choice-buttons.component';

describe('ChoiceButtonsComponent', () => {
  let component: ChoiceButtonsComponent;
  let fixture: ComponentFixture<ChoiceButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
