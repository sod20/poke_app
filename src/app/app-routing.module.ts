import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectivenessComponent } from './components/effectiveness/effectiveness.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { TeamComponent } from './components/team/team.component';

const routes: Routes = [
  {path: '', component: PokemonComponent},
  {path: 'team', component: TeamComponent},
  {path: 'types-table', component: EffectivenessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
