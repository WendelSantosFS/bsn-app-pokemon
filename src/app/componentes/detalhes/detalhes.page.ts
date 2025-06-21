import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AllPokemons } from 'src/app/services/all-pokemons.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonButton, RouterModule]
})
export class DetalhesPage implements OnInit {

  id: string | null = null
  pokemons = inject(AllPokemons)
  
  constructor(private route: ActivatedRoute) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }
  
  usingPokemons = this.pokemons.getPoke(this.id)
  


  ngOnInit() { }

}
