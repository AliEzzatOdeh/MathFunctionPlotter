import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMathFunctionPlotterComponent } from './ngx-math-function-plotter.component';

describe('NgxMathFunctionPlotterComponent', () => {
  let component: NgxMathFunctionPlotterComponent;
  let fixture: ComponentFixture<NgxMathFunctionPlotterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMathFunctionPlotterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMathFunctionPlotterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
