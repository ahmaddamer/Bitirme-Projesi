import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OgrenciislerimenueComponent } from './ogrenciislerimenue.component';

describe('OgrenciislerimenueComponent', () => {
  let component: OgrenciislerimenueComponent;
  let fixture: ComponentFixture<OgrenciislerimenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OgrenciislerimenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OgrenciislerimenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
