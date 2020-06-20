import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OgrencinumarasiComponent } from './ogrencinumarasi.component';

describe('OgrencinumarasiComponent', () => {
  let component: OgrencinumarasiComponent;
  let fixture: ComponentFixture<OgrencinumarasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OgrencinumarasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OgrencinumarasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
