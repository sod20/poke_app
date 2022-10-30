
import { Component, OnInit, EventEmitter, Output, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/components/services/shared.service';
import { FormControl, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';


@Component({
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    @Output() pokeSearch: EventEmitter<Pokemon> = new EventEmitter();
    public searchControl = new FormControl('', [Validators.minLength(3)]);
    public types: string[] = ["test", "test2"];
    selectedType: any;

    constructor(
        private pokemonService: PokemonService,
        private _sharedService: SharedService,
        private router: Router
    ) {
        this.types = Object.values(this._sharedService.getTypes()).sort();
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

    changeType() {
        console.log("GOTO " + this.selectedType);
    }

    gotoTable() {
        this.router.navigate(['/types-table']);
    }

}
