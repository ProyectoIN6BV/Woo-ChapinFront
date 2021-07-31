import { TestBed } from '@angular/core/testing';

import { RestFacturaService } from './rest-factura.service';

describe('RestFacturaService', () => {
  let service: RestFacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestFacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
