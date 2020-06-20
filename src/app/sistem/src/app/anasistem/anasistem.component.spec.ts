import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnasistemComponent } from './anasistem.component';

describe('AnasistemComponent', () => {
  let component: AnasistemComponent;
  let fixture: ComponentFixture<AnasistemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnasistemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnasistemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
