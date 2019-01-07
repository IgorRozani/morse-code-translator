import { TestBed } from '@angular/core/testing';

import { MorseCodeService } from './morse-code.service';

describe('MorseCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MorseCodeService = TestBed.get(MorseCodeService);
    expect(service).toBeTruthy();
  });
});
