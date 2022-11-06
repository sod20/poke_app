
import { Component, OnInit, EventEmitter, Output, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/components/services/shared.service';
import { FormControl, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/components/services/pokemon.service';
import { SharedDataService } from 'src/app/components/services/shared-data.service';


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
        private _sharedDataService: SharedDataService,
        private router: Router
    ) {
        this.types = Object.values(this._sharedService.getTypes()).sort();
    }


    ngOnInit(){
        this.searchControl.valueChanges
        .subscribe(
            value => {
                if (value.length >= 3) {
                    this.pokemonService.getByNameOrId(this.searchControl.value).pipe(
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
        this._sharedDataService.updateSelectedType(this.selectedType);
    }

    clearTypeSelected() {
        this._sharedDataService.updateSelectedType("");
    }

    gotoTable() {
        this.router.navigate(['/types-table']);
    }

}
