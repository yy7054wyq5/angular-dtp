import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WmodalComponent } from './wmodal.component';

describe('WmodalComponent', () => {
  let component: WmodalComponent;
  let fixture: ComponentFixture<WmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
