import { Component, OnDestroy, OnInit} from "@angular/core";
import { Pokemon, Type } from "src/app/models/pokemon";
import { TeamMember } from "src/app/models/teamMember";
import { PokemonService } from "../services/pokemon.service";
import { SharedDataService } from "../services/shared-data.service";
import { SharedService } from "../services/shared.service";

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy {

    public currentTeam: TeamMember[] = [];
    public pokemonTeam: Pokemon[] = [];

    public constructor(
        private _pokemonService: PokemonService,
        private _sharedService: SharedService,
        private _sharedDataService: SharedDataService
    ) {}

    ngOnInit(): void {
        this._sharedDataService.updateTeamViewState(false);
        this.currentTeam = this._sharedDataService.getCurrentTeam();
        this.currentTeam.forEach( member => {
            if(member.id !== 0) {
                this._pokemonService.getByNameOrId(member.id).subscribe(
                    pokemon => {
                        this.pokemonTeam.push(pokemon);
                    }
                )
            }
        });
    }

    ngOnDestroy(): void {
        this._sharedDataService.updateTeamViewState(true);
    }

    getTypes(): string[] {
        let types: string[] = [];
        this.pokemonTeam.forEach(poke => {
            console.log(poke);
            poke.types?.forEach(
                type => types.push(type.type.name)
            )
        });
        return types;
    }

    getEffectiveness(types: Type[] | undefined) {
        console.log(types);
        let currentTypes = types?.map(t => t.type.name);
        
        let typesEffectiveness = this._sharedService.getEffectiveness();
        let effectiveAgainst = [];
        for(let target of typesEffectiveness) {
            if(currentTypes?.includes(target.TYPE)) {
                effectiveAgainst.push(target.SUPPER_EFFECTIVE);
            }
        }
        return effectiveAgainst.flat();
    }

    generateRandomTeam(): void {
        this.pokemonTeam = [];
        for(let index = 0 ; index < 6; index++) {
            this._pokemonService.getByNameOrId(this.getRandomNumber()).subscribe(
                pokemon => {
                    this.pokemonTeam.push(pokemon);
                }
            )
        }
    }

    getRandomNumber(): number {
        return Math.floor(Math.random() * 809)
    }
}