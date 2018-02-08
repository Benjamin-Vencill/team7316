import { TestBed, inject } from '@angular/core/testing';

import { GooglemapService } from './googlemap.service';

describe('GooglemapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GooglemapService]
    });
  });

  it('should be created', inject([GooglemapService], (service: GooglemapService) => {
    expect(service).toBeTruthy();
  }));
});
