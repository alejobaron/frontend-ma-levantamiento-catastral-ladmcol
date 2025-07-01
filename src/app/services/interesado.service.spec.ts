import { TestBed } from '@angular/core/testing';

import { ColInteresadoService } from './interesado.service';

describe('ColInteresadoService', () => {
  let service: ColInteresadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColInteresadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
