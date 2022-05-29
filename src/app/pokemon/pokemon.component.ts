import { Component, Input, OnInit } from '@angular/core';
import { asyncScheduler, of } from 'rxjs';
import { delay, subscribeOn, switchMap } from 'rxjs/operators';
import { GEN, Pokemon } from '../models/pokemon';
import { Generation } from '../models/generation';
import { PokemonService } from '../services/pokemon.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

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
    public pokemonList: Pokemon[] = [];

    private generations: Generation = new Generation();

    constructor(
        private _pokemonService: PokemonService,
        private _sharedService: SharedService
    ) { 
    }

    ngOnInit(): void {
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
                    this.changeGeneration(gen)
                }
            }
        )
    }

    changeGeneration(gen: GEN): void {
        this.pokemonList = [];
        const loadPokemon$ = of(this.generations.getGeneration(gen));
        loadPokemon$.pipe(
                switchMap(
                    (pokeIdByGen: number[]) => {
                        return pokeIdByGen.map(pokeId => this._pokemonService.getByName(pokeId)
                        .subscribe(
                            (pokemon: Pokemon) => {
                                this.pokemonList.push(pokemon);
                            }
                        ))
                }),
                subscribeOn(asyncScheduler),
                delay(500)//enough time to load the pokemon
            ).subscribe(
                () => this.pokemonList.sort(
                        (a:Pokemon, b: Pokemon) => a.id - b.id)
            );
    }

    public getPokemon(): void {
        this.getById(this.pokeNameId);
    }

    public getById(pokemonID: number | string, toTop: boolean = false): void {
        this._pokemonService.getByName(pokemonID).subscribe(
            (data: Pokemon) => {
                this.setSearchOrSelected(data);
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
}
