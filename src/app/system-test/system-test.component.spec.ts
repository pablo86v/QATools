import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemTestComponent } from './system-test.component';

describe('SystemTestComponent', () => {
  let component: SystemTestComponent;
  let fixture: ComponentFixture<SystemTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
