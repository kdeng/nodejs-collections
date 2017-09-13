import { TestBed, inject } from '@angular/core/testing';

import { StuffOIDCServiceService } from './stuff-oidcservice.service';

describe('StuffOIDCServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StuffOIDCServiceService]
    });
  });

  it('should be created', inject([StuffOIDCServiceService], (service: StuffOIDCServiceService) => {
    expect(service).toBeTruthy();
  }));
});
