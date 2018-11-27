import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuiGridComponent } from './mui-grid.component';

describe('MuiGridComponent', () => {
  let component: MuiGridComponent;
  let fixture: ComponentFixture<MuiGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuiGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuiGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
