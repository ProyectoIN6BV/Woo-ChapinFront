import { TestBed } from '@angular/core/testing';

import { RestCategoriaService } from './rest-categoria.service';

describe('RestCategoriaService', () => {
  let service: RestCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});