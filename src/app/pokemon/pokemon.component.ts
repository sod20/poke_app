import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { GEN, Pokemon } from '../models/pokemon';
import { Generation } from '../models/generation';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

    pokeNameId: string = "";
    pokemonSearch: Pokemon = {
        id: 0,
        name: '',
        type: [""],
        abilities: [ {ability: {name: "", url: ""}, is_hidden: false, slot:0} ],
        sprites: undefined,
        types: undefined
    };
    pokemonList: Pokemon[] = [];

    private generations: Generation = new Generation();

    constructor(private _pokemonService: PokemonService) { }

    ngOnInit(): void {
        const loadPokemon$ = of(this.generations.getGeneration(GEN.THREE));
        loadPokemon$.pipe(
                mergeMap(
                    (data: number[]) => {
                        return data.map(id => this._pokemonService.getByName(id).subscribe(
                            (data: Pokemon) => {
                                this.pokemonList.push(data);
                            }
                        ))
                })
            ).subscribe(
                () => this.pokemonList.sort(
                        (a:Pokemon, b: Pokemon) => a.id - b.id)
            );
        
    }

    getPokemon() {
        this._pokemonService.getByName(this.pokeNameId).subscribe(
            (data: Pokemon) => {
                this.pokemonSearch = data;
                console.log(this.pokemonSearch);
            }
        );
    }

    getById(pokemonID: number | string, toTop: boolean = false) {
        this._pokemonService.getByName(pokemonID).subscribe(
            (data: Pokemon) => {
                this.pokemonSearch = data;
                if(toTop) this.goToTop();
            }
        );
    }

    private goToTop() {
        window.scroll(0,0);
    }
    
}
