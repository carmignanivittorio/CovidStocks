import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartitionedPageComponent } from './partitioned-page.component';

describe('PartitionedPageComponent', () => {
  let component: PartitionedPageComponent;
  let fixture: ComponentFixture<PartitionedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartitionedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartitionedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
