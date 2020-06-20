import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OgrencibilgileriComponent } from './ogrencibilgileri.component';

describe('OgrencibilgileriComponent', () => {
  let component: OgrencibilgileriComponent;
  let fixture: ComponentFixture<OgrencibilgileriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OgrencibilgileriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OgrencibilgileriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
