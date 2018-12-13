import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNzSelectComponent } from './test-nz-select.component';

describe('TestNzSelectComponent', () => {
  let component: TestNzSelectComponent;
  let fixture: ComponentFixture<TestNzSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestNzSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNzSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
