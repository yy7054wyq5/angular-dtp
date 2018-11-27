import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuiItemComponent } from './mui-item.component';

describe('MuiItemComponent', () => {
  let component: MuiItemComponent;
  let fixture: ComponentFixture<MuiItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuiItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
