import { TestBed } from '@angular/core/testing';

import { RestCartService } from './rest-cart.service';

describe('RestCartService', () => {
  let service: RestCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
