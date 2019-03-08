import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendsZorroUploadComponent } from './extends-zorro-upload.component';

describe('ExtendsZorroUploadComponent', () => {
  let component: ExtendsZorroUploadComponent;
  let fixture: ComponentFixture<ExtendsZorroUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendsZorroUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendsZorroUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
