import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OgretimComponent } from './ogretim.component';

describe('OgretimComponent', () => {
  let component: OgretimComponent;
  let fixture: ComponentFixture<OgretimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OgretimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OgretimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
