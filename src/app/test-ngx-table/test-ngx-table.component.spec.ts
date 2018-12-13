import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNgxTableComponent } from './test-ngx-table.component';

describe('TestNgxTableComponent', () => {
  let component: TestNgxTableComponent;
  let fixture: ComponentFixture<TestNgxTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestNgxTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNgxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
