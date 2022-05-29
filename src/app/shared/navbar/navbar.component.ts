import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    public searchControl = new FormControl('', [Validators.minLength(3)]);

    @Output() pokeSearch: EventEmitter<Pokemon> = new EventEmitter();

    constructor(
        private pokemonService: PokemonService
    ) {
        
    }

    ngOnInit(){
        this.searchControl.valueChanges
        .subscribe(
            value => {
                if (value.length >= 3) {
                    this.pokemonService.getByName(this.searchControl.value).pipe(
                        catchError(() => {
                            return throwError("No se ha encontrado el pokemon");
                        })
                    ).subscribe(
                    poke => {
                        this.pokeSearch.emit(poke);
                        const toResetSearchBox = confirm("Se ha encontrado el pokemon, limpiar caja de busqueda?").valueOf();
                        if (toResetSearchBox) this.searchControl.setValue(String());                        
                    },
                    err => console.error(err)
                )
            }
        });
    }

}
