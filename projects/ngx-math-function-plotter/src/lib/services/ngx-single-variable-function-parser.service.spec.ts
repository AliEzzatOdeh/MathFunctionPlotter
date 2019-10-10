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
});
