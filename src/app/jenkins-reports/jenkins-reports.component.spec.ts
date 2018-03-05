import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JenkinsReportsComponent } from './jenkins-reports.component';

describe('JenkinsReportsComponent', () => {
  let component: JenkinsReportsComponent;
  let fixture: ComponentFixture<JenkinsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JenkinsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JenkinsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
