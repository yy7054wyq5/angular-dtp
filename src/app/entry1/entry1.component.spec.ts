import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Entry1Component } from './entry1.component';

describe('Entry1Component', () => {
  let component: Entry1Component;
  let fixture: ComponentFixture<Entry1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Entry1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Entry1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
