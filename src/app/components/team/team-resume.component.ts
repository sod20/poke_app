import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { TeamMember } from 'src/app/models/teamMember';
import { PokemonService } from '../services/pokemon.service';
import { SharedDataService } from '../services/shared-data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-team-resume',
    templateUrl: './team-resume.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamResumeComponent implements OnInit, OnDestroy {

    public showTeamView: boolean = true;
    public pokeTeam: Array<TeamMember> = [];
    public currentTeamIndex = 5;
    
    //@Output() selectedPokemon: EventEmitter<Pokemon> = new EventEmitter();

    teamMemberSubscription: Subscription | undefined;
    teamViewSubscription: Subscription | undefined;

    constructor(
        private _pokemonService: PokemonService,
        private _sharedDataService: SharedDataService,
        private _router: Router
    ) {
        this.pokeTeam = [];
        for(let i = 0; i < 5; i++) {
            this.pokeTeam.push({id: 0, index: i, name: '', sprite: ''});
        }
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

        this.teamViewSubscription = this._sharedDataService._teamViewObs.subscribe(
            state => this.showTeamView = state
        );
        //this.showTeamView = this._router.url !== '/team' ? true : false;
    }

    ngOnDestroy(): void {
        this.teamMemberSubscription?.unsubscribe();
    }

    public setCurrentIndex(index: number) {
        this.currentTeamIndex = index;
    }

    public gotoTeamView() {
        this._sharedDataService.setCurrentTeam(this.pokeTeam);
        this._router.navigate(['/team']);
    }

}
