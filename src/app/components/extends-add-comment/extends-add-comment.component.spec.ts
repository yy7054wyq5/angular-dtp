import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendsAddCommentComponent } from './extends-add-comment.component';

describe('ExtendsAddCommentComponent', () => {
  let component: ExtendsAddCommentComponent;
  let fixture: ComponentFixture<ExtendsAddCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendsAddCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendsAddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
