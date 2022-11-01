import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { TeamMember } from 'src/app/models/teamMember';
import { PokemonService } from '../services/pokemon.service';
import { SharedDataService } from '../services/shared-data.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy {

    public pokeTeam: Array<TeamMember> = [];
    public currentTeamIndex = 5;
    @Output() selectedPokemon: EventEmitter<Pokemon> = new EventEmitter();

    teamMemberSubscription: Subscription | undefined;

    constructor(
        private _pokemonService: PokemonService,
        private _sharedDataService: SharedDataService
    ) {
        this.pokeTeam = [];
        for(let i = 0; i < 5; i++) {
            this.pokeTeam.push({id: 0, index: i, name: '', sprite: ''});
        }
        console.log(this.pokeTeam);
    }

    ngOnInit(): void {
        this.teamMemberSubscription = this._sharedDataService._teamMemberObs.subscribe(
            teamMember => {
                teamMember.index = this.currentTeamIndex;
                this.pokeTeam[this.currentTeamIndex] = teamMember;
                this.currentTeamIndex++;
                if(this.currentTeamIndex >= 6) this.currentTeamIndex = 0;
            }
        );
    }

    ngOnDestroy(): void {
        this.teamMemberSubscription?.unsubscribe();
    }

    public setCurrentIndex(index: number) {
        this.currentTeamIndex = index;
    }

}
