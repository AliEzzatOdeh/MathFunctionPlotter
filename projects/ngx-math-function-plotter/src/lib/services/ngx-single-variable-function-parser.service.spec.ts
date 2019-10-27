import { TestBed } from '@angular/core/testing';

import { NgxSingleVariableFunctionParserService } from './ngx-single-variable-function-parser.service';

describe('NgxSingleVariableFunctionParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxSingleVariableFunctionParserService = TestBed.get(NgxSingleVariableFunctionParserService);
    expect(service).toBeTruthy();
  });

  it('should resolve expression (1+2)*(8/4) to be 6', () => {
    const service: NgxSingleVariableFunctionParserService = TestBed.get(NgxSingleVariableFunctionParserService);
    service.setMathFunctionText('(1+2)*(8/4)');
    expect(service.computeFunctionAtValue(0)).toBe(6);
  });

  it('should resolve expression (x^2)*(x-1) at x=4 to be 48', () => {
    const service: NgxSingleVariableFunctionParserService = TestBed.get(NgxSingleVariableFunctionParserService);
    service.setMathFunctionText('(x^2)*(xsub1)');
    expect(service.computeFunctionAtValue(4)).toBe(48);
  });

  it('should resolve expression sqr(x) at x=16 to be 4', () => {
    const service: NgxSingleVariableFunctionParserService = TestBed.get(NgxSingleVariableFunctionParserService);
    service.setMathFunctionText('sqr(x)');
    expect(service.computeFunctionAtValue(16)).toBe(4);
  });

  it('should resolve expression sin(x)-cos(x) at x=0 to be -1', () => {
    const service: NgxSingleVariableFunctionParserService = TestBed.get(NgxSingleVariableFunctionParserService);
    service.setMathFunctionText('sin(x)subcos(x)');
    expect(service.computeFunctionAtValue(0)).toBe(-1);
  });

  it('should resolve expression tan(x)+cos(x) at x=0 to be 1', () => {
    const service: NgxSingleVariableFunctionParserService = TestBed.get(NgxSingleVariableFunctionParserService);
    service.setMathFunctionText('tan(x)+cos(x)');
    expect(service.computeFunctionAtValue(0)).toBe(1);
  });

  it('should resolve floating point expression sin(3.1428571428571429) < 1', () => {
    const service: NgxSingleVariableFunctionParserService = TestBed.get(NgxSingleVariableFunctionParserService);
    service.setMathFunctionText('sin(3.1428571428571429)');
    expect(service.computeFunctionAtValue(0)).toBeLessThan(1);
  });
});
