import { TestBed } from '@angular/core/testing';

import { UnidadEspacialService } from './unidad-espacial.service';

describe('UnidadEspacialService', () => {
  let service: UnidadEspacialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadEspacialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
