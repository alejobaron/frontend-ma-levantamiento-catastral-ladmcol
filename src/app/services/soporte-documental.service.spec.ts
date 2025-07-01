import { TestBed } from '@angular/core/testing';

import { SoporteDocumentalService } from './soporte-documental.service';

describe('SoporteDocumentalService', () => {
  let service: SoporteDocumentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoporteDocumentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
