import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkIndexComponent } from './cdk-index.component';

describe('CdkIndexComponent', () => {
  let component: CdkIndexComponent;
  let fixture: ComponentFixture<CdkIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdkIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdkIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
