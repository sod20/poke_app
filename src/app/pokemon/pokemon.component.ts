import { Component, OnInit } from '@angular/core';
import { of, map } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';
import { Generation } from '../models/generation';
import { PokemonService } from '../services/pokemon.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

    pokeNameId: string = "";
    pokemonSearch: Pokemon = {};
    pokemonList: Pokemon[] = [];

    generations: Generation = new Generation;

    constructor(private _pokemonService: PokemonService, private primengConfig: PrimeNGConfig) { }

    ngOnInit(): void {
        const loadPokemon$ = of(this.generations.getGeneration1());
        loadPokemon$.pipe(
                mergeMap(
                    (data: number[]) => {
                        return data.map(id => this._pokemonService.getByName(""+id).subscribe(
                            (data: Pokemon) => {
                                this.pokemonList.push(data);
                            }
                        ))
                })
            ).subscribe();
        this.primengConfig.ripple = true;
    }

    getPokemon() {
        this._pokemonService.getByName(this.pokeNameId).subscribe(
            (data: Pokemon) => {
                console.log(data);
                this.pokemonSearch = data;
            }
        );
    }

    
}
