import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem } from '@ionic/angular/standalone';

import { ViewWillEnter } from '@ionic/angular';

interface favorito {
  id: number,
  url: string,
  status: string
}

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterModule, IonList, IonItem]
})
export class FavoritosPage implements OnInit, ViewWillEnter {

  favoritos: favorito[] = []
  chaveLocalStorage: string = 'chaveSecreta'
  baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/'

  constructor() { }

  getLocal () {
    const data = localStorage.getItem(this.chaveLocalStorage)

    if (data === null) { this.favoritos = [] } 
    else {
      this.favoritos =  JSON.parse(data)
    }
    return this.favoritos
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getLocal()
  }
  

}
