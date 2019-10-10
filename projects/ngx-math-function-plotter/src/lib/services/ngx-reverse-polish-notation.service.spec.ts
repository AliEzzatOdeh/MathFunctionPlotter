import { TestBed } from '@angular/core/testing';

import { NgxReversePolishNotationService } from './ngx-reverse-polish-notation.service';

describe('NgxReversePolishNotationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxReversePolishNotationService = TestBed.get(NgxReversePolishNotationService);
    expect(service).toBeTruthy();
  });
});
