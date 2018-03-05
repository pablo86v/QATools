import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeysDataComponent } from './keys-data.component';

describe('KeysDataComponent', () => {
  let component: KeysDataComponent;
  let fixture: ComponentFixture<KeysDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeysDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeysDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
