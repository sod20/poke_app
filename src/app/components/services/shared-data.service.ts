import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { TeamMember } from 'src/app/models/teamMember';

const defaultTeamMember = {id: 0, index:0, name: '', sprite: ''};

@Injectable({
    providedIn: 'root',
})
export class SharedDataService {

    private teamMember = new BehaviorSubject<TeamMember>(defaultTeamMember);
    _teamMemberObs = this.teamMember.asObservable();

    private selectedType = new BehaviorSubject<string>("");
    _selectedTypeObs = this.selectedType.asObservable();

    private teamView = new BehaviorSubject<boolean>(true);
    _teamViewObs = this.teamView.asObservable();

    private currentTeam: TeamMember[] = [];

    addTeamMember(teamMember: TeamMember) {
        this.teamMember.next(teamMember);
    }

    updateSelectedType(type: string) {
        this.selectedType.next(type);
    }

    updateTeamViewState(state: boolean) {
        this.teamView.next(state);
    }

    setCurrentTeam(currentTeam: TeamMember[]) {
        this.currentTeam = currentTeam;
    }

    getCurrentTeam(): TeamMember[] {
        return this.currentTeam;
    }

}