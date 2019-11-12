import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvincesCitiesMapComponent } from './provinces-cities-map.component';

describe('ProvincesCitiesMapComponent', () => {
  let component: ProvincesCitiesMapComponent;
  let fixture: ComponentFixture<ProvincesCitiesMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvincesCitiesMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvincesCitiesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
