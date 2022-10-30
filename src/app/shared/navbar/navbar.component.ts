import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/components/services/shared.service';

@Component({
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    public types: string[] = ["test", "test2"];
    selectedType: any;

    constructor(
        private _sharedService: SharedService,
        private router: Router
    ) {
        this.types = Object.values(this._sharedService.getTypes()).sort();
    }

    ngOnInit(){
    }

    changeType() {
        console.log("GOTO " + this.selectedType);
    }

    gotoTable() {
        this.router.navigate(['/types-table']);
    }

}
