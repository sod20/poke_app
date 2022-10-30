import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../components/services/pokemon.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  public pokeTeam: Array<Pokemon> = [];
  @Output() selectedPokemon: EventEmitter<Pokemon> = new EventEmitter();

  constructor(
    private _pokemonService: PokemonService
  ) {
    this.pokeTeam = this._pokemonService.getTeam();
  }

  ngOnInit(): void {
  }

  public getSelection(id: number) {
    const selected  = this.pokeTeam.find(pokemon => pokemon.id === id);
    this.selectedPokemon.emit(selected);
  }

}
