import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wmodal2Component } from './wmodal2.component';

describe('Wmodal2Component', () => {
  let component: Wmodal2Component;
  let fixture: ComponentFixture<Wmodal2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wmodal2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wmodal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
