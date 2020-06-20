import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdarikismiComponent } from './idarikismi.component';

describe('IdarikismiComponent', () => {
  let component: IdarikismiComponent;
  let fixture: ComponentFixture<IdarikismiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdarikismiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdarikismiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
