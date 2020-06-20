import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OgrenciisleriComponent } from './ogrenciisleri.component';

describe('OgrenciisleriComponent', () => {
  let component: OgrenciisleriComponent;
  let fixture: ComponentFixture<OgrenciisleriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OgrenciisleriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OgrenciisleriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
