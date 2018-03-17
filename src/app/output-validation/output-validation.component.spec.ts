import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputValidationComponent } from './output-validation.component';

describe('OutputValidationComponent', () => {
  let component: OutputValidationComponent;
  let fixture: ComponentFixture<OutputValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
