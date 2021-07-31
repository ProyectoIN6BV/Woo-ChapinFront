import { TestBed } from '@angular/core/testing';

import { RestEnvioService } from './rest-envio.service';

describe('RestEnvioService', () => {
  let service: RestEnvioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestEnvioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
