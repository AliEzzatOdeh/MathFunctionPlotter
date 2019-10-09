import { TestBed } from '@angular/core/testing';

import { NgxMathFunctionPlotterService } from './ngx-math-function-plotter.service';

describe('NgxMathFunctionPlotterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxMathFunctionPlotterService = TestBed.get(NgxMathFunctionPlotterService);
    expect(service).toBeTruthy();
  });
});
