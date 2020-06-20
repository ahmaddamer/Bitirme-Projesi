import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OgrencisayfasiComponent } from './ogrencisayfasi.component';

describe('OgrencisayfasiComponent', () => {
  let component: OgrencisayfasiComponent;
  let fixture: ComponentFixture<OgrencisayfasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OgrencisayfasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OgrencisayfasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
