import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})

export class PokemonService {

    constructor(private http: HttpClient) { }

    url: string = "https://pokeapi.co/api/v2/";

    getByName(idOrName: string) {
        return this.http.get<Pokemon>(this.url + "pokemon/" + idOrName);
    }

    getGenerations(generationId: number) {
        console.log("GET:: " + this.url + `generation/${generationId}`)
        return this.http.get<any>(this.url + `generation/${generationId}`);
    }

    getFromURL(url: string) {
        return this.http.get(url);
    }
}