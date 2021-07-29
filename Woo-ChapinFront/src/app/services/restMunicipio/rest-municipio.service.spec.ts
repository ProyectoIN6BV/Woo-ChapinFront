import { TestBed } from '@angular/core/testing';

import { RestMunicipioService } from './rest-municipio.service';

describe('RestCategoriaService', () => {
  let service: RestMunicipioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestMunicipioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});