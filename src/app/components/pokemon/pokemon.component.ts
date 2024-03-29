import { Component, Input, OnInit } from '@angular/core';
import { asyncScheduler, of } from 'rxjs';
import { delay, mergeMap, subscribeOn, switchMap } from 'rxjs/operators';
import { GEN, Pokemon, Type } from '../../models/pokemon';
import { Generation } from '../../models/generation';
import { PokemonService } from '../services/pokemon.service';
import { SharedService } from '../services/shared.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

    currentGeneration: number = 1;
    pokeNameId: string = "";
    @Input() pokemonSearch: Pokemon = {
        id: 0,
        name: '',
        type: [""],
        abilities: [ {ability: {name: "", url: ""}, is_hidden: false, slot:0} ],
        sprites: undefined,
        types: undefined,
        isSelected: false
    };
    public originalList: Pokemon[] = [];
    public pokemonList: Pokemon[] = [];

    private generations: Generation = new Generation();

    constructor(
        private _pokemonService: PokemonService,
        private _sharedService: SharedService,
        private _sharedDataService: SharedDataService
    ) { 
    }

    ngOnInit(): void {
        this.currentGeneration = GEN.ONE; 
        this.changeGeneration(GEN.ONE);
        this._sharedService.currentGeneration$.subscribe(
            data => {
                let gen: GEN = GEN.ONE;
                switch(data) {
                    case 1:
                        gen = GEN.ONE;
                        break;
                    case 2:
                        gen = GEN.TWO;
                        break;
                    case 3:
                        gen = GEN.THREE;
                        break;
                    case 4:
                        gen = GEN.FOUR;
                        break;
                    case 5:
                        gen = GEN.FIVE;
                        break;
                    case 6:
                        gen = GEN.SIX;
                        break;
                    case 7:
                        gen = GEN.SEVEN;
                        break;
                    case 10:
                        this.pokemonList.forEach(poke => console.log(poke.id));
                        break;
                }
                if (data <= 7) {
                    this.currentGeneration = gen;
                    this.changeGeneration(gen)
                }
            }
        );

        this._sharedDataService._selectedTypeObs.subscribe(
            value => {
                if (value != "") {
                    let result = this.originalList.filter(
                        pokemon => pokemon.types?.map(t => t.type.name).includes(value)
                    );
                    this.pokemonList = result;
                } else {
                    this.pokemonList = this.originalList;
                }
            }
        );
    }

    changeGeneration(gen: GEN): void {
        this.originalList = [];
        this.pokemonList = [];
        const loadPokemon$ = of(this.generations.getGeneration(gen));
        loadPokemon$.pipe(
                switchMap(
                    (pokeIdByGen: number[]) => {
                        return pokeIdByGen.map(pokeId => this._pokemonService.getByNameOrId(pokeId)
                        .subscribe(
                            (pokemon: Pokemon) => {
                                this.originalList.push(pokemon);
                            }
                        ))
                }),
                subscribeOn(asyncScheduler),
                delay(500)//enough time to load the pokemon
            ).subscribe(
                () => this.originalList.sort((a:Pokemon, b: Pokemon) => a.id - b.id),
                err => console.error(err),
                () => this.pokemonList = this.originalList
            );
    }

    public getPokemon(): void {
        this.getById(this.pokeNameId);
    }

    public getById(pokemonID: number | string, toTop: boolean = false): void {
        this._pokemonService.getByNameOrId(pokemonID).subscribe(
            (data: Pokemon) => {
                this.pokemonSearch = data;
                if(toTop) this.goToTop();
            }
        );
    }

    private goToTop(): void {
        window.scroll(0,0);
    }

    public modifyTeam(pokemon: Pokemon): void {
        if (!pokemon.isSelected) {
            this._pokemonService.addToTeam(pokemon);   
        } else {        
            this._pokemonService.removeFromTeam(pokemon);
            this.pokemonSearch.name = String(); //Soft reset the search
        }
    }

    public setSearchOrSelected(pokemon: Pokemon): void {
        this.pokemonSearch = pokemon;
    }

    public addToTeam(id: number, name: string, sprite: string | undefined) {
        this._sharedDataService.addTeamMember({id: id, index: 0, name: name, sprite: sprite});
    }
}
