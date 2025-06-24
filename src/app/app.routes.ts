import { Routes } from '@angular/router';
import { HomePage } from './componentes/home/home.page';
import { DetalhesPage } from './componentes/detalhes/detalhes.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'detalhes/:id',
    component: DetalhesPage
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./componentes/favoritos/favoritos.page').then( m => m.FavoritosPage)
  }
];
