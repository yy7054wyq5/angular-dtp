import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRowDetailComponent } from './ngx-row-detail.component';

describe('NgxRowDetailComponent', () => {
  let component: NgxRowDetailComponent;
  let fixture: ComponentFixture<NgxRowDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxRowDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
