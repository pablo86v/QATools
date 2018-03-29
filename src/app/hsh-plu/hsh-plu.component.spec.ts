import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HshPluComponent } from './hsh-plu.component';

describe('HshPluComponent', () => {
  let component: HshPluComponent;
  let fixture: ComponentFixture<HshPluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HshPluComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HshPluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
