import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/components/services/shared.service';

@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[] = [];

    generations = [1,2,3,4,5,6,7];
    
    constructor (private _sharedService: SharedService, private router: Router) {}

    ngOnInit() {
    }

    setGeneration(gen: number) {
        if (this.router.url != "/" ) {
            this.router.navigate(['/']);
        }
        setTimeout(() => this._sharedService.setCurrentGeneration(gen), 500);
    }
}
