import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

    addTeamMember(teamMember: TeamMember) {
        this.teamMember.next(teamMember);
    }

    updateSelectedType(type: string) {
        this.selectedType.next(type);
    }
}