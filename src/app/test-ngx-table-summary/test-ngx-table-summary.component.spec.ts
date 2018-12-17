import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNgxTableSummaryComponent } from './test-ngx-table-summary.component';

describe('TestNgxTableSummaryComponent', () => {
  let component: TestNgxTableSummaryComponent;
  let fixture: ComponentFixture<TestNgxTableSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestNgxTableSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNgxTableSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
