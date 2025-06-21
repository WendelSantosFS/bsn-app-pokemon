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

  public pokemons: PokemonResult[]= []
  public countPokemons: number = 0;

  constructor( private fetchPokemonService: FetchPokemonService) { }

  ngOnInit() {
    this.fetchPokemonService.getPokemonsInitial().subscribe({
        next: (data: Pokemons ) => {
          this.pokemons = data.results;
          this.countPokemons = data.count;
        },
        error: (error) => {
          console.log('Erro ao carregar pokemons: ', error)
        }
      })
  }


}
