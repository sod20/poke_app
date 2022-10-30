import { Component } from '@angular/core';
import { Pokemon } from './models/pokemon';
import { PokemonService } from './components/services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private pokemonService: PokemonService
  ) { }

  title = 'poke_app';
  public currentPoke: Pokemon = { id: 0, name: '', type: [""], abilities: [ {ability: {name: "", url: ""}, is_hidden: false, slot:0} ], sprites: undefined, types: undefined, isSelected: false };
  
  public setPoke(poke: Pokemon) {
      this.currentPoke = poke;
  }
}
