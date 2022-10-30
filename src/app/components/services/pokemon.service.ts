import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../../models/pokemon';

@Injectable({
  providedIn: 'root',
})

export class PokemonService {

    private team: Pokemon[] = [];

    constructor(private http: HttpClient) { }

    url: string = "https://pokeapi.co/api/v2/";

    getByName(idOrName: number | string ) {
        return this.http.get<Pokemon>(this.url + "pokemon/" + idOrName);
    }

    getGenerations(generationId: number) {
        console.log("GET:: " + this.url + `generation/${generationId}`)
        return this.http.get<any>(this.url + `generation/${generationId}`);
    }

    getFromURL(url: string) {
        return this.http.get(url);
    }

    /* Team Functions */
    public addToTeam(pokemon: Pokemon): void {
        pokemon.isSelected = true; // Set the pokemon as selected
        this.team.push(pokemon);
    }

    public removeFromTeam(pokemon: Pokemon): void {
        this.team.splice(this.team.indexOf(pokemon), 1);
    }

    public getTeam(): Pokemon[] {
        return this.team;
    }

}