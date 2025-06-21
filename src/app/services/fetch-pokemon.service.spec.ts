import { TestBed } from '@angular/core/testing';

import { FetchPokemonService } from './fetch-pokemon.service';

describe('FetchPokemonService', () => {
  let service: FetchPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
