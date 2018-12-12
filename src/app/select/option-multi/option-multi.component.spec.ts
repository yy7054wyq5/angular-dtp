import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionMultiComponent } from './option-multi.component';

describe('OptionMultiComponent', () => {
  let component: OptionMultiComponent;
  let fixture: ComponentFixture<OptionMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionMultiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
