import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Entry2Component } from './entry2.component';

describe('Entry2Component', () => {
  let component: Entry2Component;
  let fixture: ComponentFixture<Entry2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Entry2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Entry2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
