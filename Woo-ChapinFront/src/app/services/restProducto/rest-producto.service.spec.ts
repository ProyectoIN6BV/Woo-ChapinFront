import { TestBed } from '@angular/core/testing';

import { RestProductoService } from './rest-producto.service';

describe('RestProductoService', () => {
  let service: RestProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
