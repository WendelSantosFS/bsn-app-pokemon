import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FetchPokemonService } from 'src/app/services/fetch-pokemon.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonButton, RouterModule]
})
export class DetalhesPage implements OnInit {

  id: string | null = null;

  pokemon: any;
  arrayAbilities: string[] = []
 
  
  constructor(
    private route: ActivatedRoute, 
    private fetchPokemonService: FetchPokemonService,
    private router: Router
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }
  
  ngOnInit() {
    this.fetchPokemonService.getOnePokemon(this.id).subscribe({
      next: (data: any) => {
        this.pokemon = data;
        console.log('Dados recebidos: ', data)

        this.router.navigate(['/detalhes', this.id])
      },
      error: (error: any) => {
        console.log('Erro detectado: ', error)
      }
    })
   }

}
