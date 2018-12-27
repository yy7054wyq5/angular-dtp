import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatTemplateComponent } from './creat-template.component';

describe('CreatTemplateComponent', () => {
  let component: CreatTemplateComponent;
  let fixture: ComponentFixture<CreatTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
