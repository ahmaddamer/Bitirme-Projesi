import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkademikGirisComponent } from './akademik-giris.component';

describe('AkademikGirisComponent', () => {
  let component: AkademikGirisComponent;
  let fixture: ComponentFixture<AkademikGirisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkademikGirisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkademikGirisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
