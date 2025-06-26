import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonGrid, IonButton, IonRouterLink } from '@ionic/angular/standalone';

import { RouterModule } from '@angular/router';
import { FetchPokemonService, PokemonResult, Pokemons } from 'src/app/services/fetch-pokemon.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonGrid, IonButton, IonRouterLink, CommonModule, RouterModule],
})
export class HomePage implements OnInit {

  public initialRequestPokemons: Pokemons = {
    count: 0,
    next: null,
    previous: null,
    results: []
  }

  public pokemons: PokemonResult[]= []
  public countPokemons: number = 0;

  public initialPagesPokemon: number = 1;
  public totalPagesPokemon: number = 0;


  constructor( private fetchPokemonService: FetchPokemonService) { }

  ngOnInit() {
    this.fetchPokemonService.getPokemonsInitial().subscribe({
        next: (data: Pokemons ) => {
          this.initialRequestPokemons = data;
          this.pokemons = data.results;
          this.countPokemons = data.count;

          this.totalPagesPokemon = Math.ceil(data.count / 30);
        },
        error: (error) => {
          console.log('Erro ao carregar pokemons: ', error)
        }
      })
  }

  previusPagePokemon ( url: any ) {
    if (typeof(url) === 'string') {
      
      this.fetchPokemonService.getPagePokemon(url).subscribe( {
        next: (data: Pokemons ) => {
          this.initialRequestPokemons = data;
          this.pokemons = data.results;
          this.countPokemons = data.count;
          this.initialPagesPokemon -= 1;
          },
          error: (error) => {
            console.log('Erro ao carregar pokemons: ', error)
          }
      })
    }
  }


  nextPagePokemon ( url: any ) {
    if (typeof(url) === 'string') {
      
      console.log(url)

      this.fetchPokemonService.getPagePokemon(url).subscribe( {
        next: (data: Pokemons ) => {
          this.initialRequestPokemons = data;
          this.pokemons = data.results;
          this.countPokemons = data.count;
          this.initialPagesPokemon += 1;
          },
          error: (error) => {
            console.log('Erro ao carregar pokemons: ', error)
          }
      })
    }
  }
}
