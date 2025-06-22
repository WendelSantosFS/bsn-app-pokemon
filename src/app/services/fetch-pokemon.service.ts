import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PokemonResult {
  name: string,
  url: string
}

export interface Pokemons {
  count: number,
  next: string | null,
  previus: string | null
  results: PokemonResult[]
}


@Injectable({
  providedIn: 'root'
})
export class FetchPokemonService {

  private base_url: string = 'https://pokeapi.co/api/v2/pokemon/'
  private initialUrlPokemon = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30'; // 30 pokemons   início= 0
  // private nextPagePokemons: string | null = null


  constructor(private http: HttpClient) { }

  getPokemonsInitial(): Observable<Pokemons> {
    return this.http.get<any>(this.initialUrlPokemon)
  }

  getOnePokemon (nameOrId: string | null): Observable<any> {
    const url = `${this.base_url}${nameOrId}`
    return this.http.get<any>(url)
  }

}
