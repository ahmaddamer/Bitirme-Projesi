import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonuclarComponent } from './sonuclar.component';

describe('SonuclarComponent', () => {
  let component: SonuclarComponent;
  let fixture: ComponentFixture<SonuclarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonuclarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonuclarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
