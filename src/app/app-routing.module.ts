import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectivenessComponent } from './components/effectiveness/effectiveness.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';

const routes: Routes = [
  {path: '', component: PokemonComponent},
  {path: 'types-table', component: EffectivenessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
