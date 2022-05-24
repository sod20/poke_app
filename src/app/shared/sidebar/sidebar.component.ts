import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[] = [];

    generations = [1,2,3,4,5,6,7];
    
    constructor (private _sharedService: SharedService) {}

    ngOnInit() {
    }

    setGeneration(gen: number) {
        this._sharedService.setCurrentGeneration(gen);
    }
}
