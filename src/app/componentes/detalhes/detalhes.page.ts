import { star, trash } from 'ionicons/icons';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons} from 'ionicons'
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FetchPokemonService, abilititesInter } from 'src/app/services/fetch-pokemon.service';


@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    IonCard, 
    IonButton, 
    RouterModule, 
    IonIcon,
  
  ]
})
export class DetalhesPage implements OnInit {

  id: string | null = null;

  pokemon: any;
  arrayAbilities: string[] = []
  abilities: abilititesInter[] = []

  arrayFavorites: any[] = []
  chaveLocalStorage: string = 'chaveSecreta'

  
  constructor(
    private route: ActivatedRoute, 
    private fetchPokemonService: FetchPokemonService,
    private router: Router
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');

      addIcons({
      star,
      trash
    })
  }

  getLocal () {
    const dataLocal = localStorage.getItem(this.chaveLocalStorage)
    
    if (dataLocal === null) {
      return this.arrayFavorites = []
    } 
    const convertData: any[] = JSON.parse(dataLocal)
    return this.arrayFavorites = convertData;
  }

  isFavorite( id: number ): boolean {   // Se não existir nada no localStorage RETORNA false ou se já estiver como favorito. Se não estiver salvo como favorito ele RETORNA true. 
    let resultBoo: boolean= false;

    this.arrayFavorites.forEach( (pok) => {
      if (pok.id === id) {
        resultBoo = true;
      }
    })

    return resultBoo;
  }
  
  ngOnInit() {
    this.fetchPokemonService.getOnePokemon(this.id).subscribe({
      next: (data: any) => {
        this.pokemon = data;
        this.abilities = data.abilities
        
        while (typeof(this.abilities[0].ability.name) === undefined) { 
          return this.ngOnInit()
        }
        for (let i=0; i < this.abilities.length; i++) {
          this.arrayAbilities.push( this.abilities[i].ability.name)
        }

        this.router.navigate(['/detalhes', this.id])
      },
      error: (error: any) => {
        console.log('Erro detectado: ', error)
      }
    })

    this.getLocal()
   }


   addFavoritePokemon ( id: number ) {
      const nameFavorite = this.id;
      const findPoke: number = this.arrayFavorites.findIndex( (value) => value.id === id)
      
      if (findPoke === -1) {

        const newFavoritePoke = {
          id,
          url: nameFavorite,
          status: 'favorite'
        }

        this.arrayFavorites.push(newFavoritePoke)
    
        localStorage.setItem(this.chaveLocalStorage, JSON.stringify( this.arrayFavorites ))
      }
      return null
   }

   removeFavoritePokemon (id: number) {
    const newArray = this.arrayFavorites.filter( (pok: any) => pok.id !== id)

    localStorage.setItem(this.chaveLocalStorage, JSON.stringify(newArray))

    this.arrayFavorites = newArray;

    return this.arrayFavorites
   }

   
}
