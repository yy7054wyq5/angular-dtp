import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseTplInCompComponent } from './use-tpl-in-comp.component';

describe('UseTplInCompComponent', () => {
  let component: UseTplInCompComponent;
  let fixture: ComponentFixture<UseTplInCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseTplInCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseTplInCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
