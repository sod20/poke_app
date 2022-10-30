import { Component, OnInit } from "@angular/core";
import { SharedService } from "../services/shared.service";

@Component({
    selector: 'app-effectiveness-table',
    templateUrl: './effectivenes.component.html',
    styleUrls: ['./effectivenes.component.scss']
})

  export class EffectivenessComponent implements OnInit {

    effectivenessTable: any;
    tableKeys: string[] = [];

    constructor(
        private _sharedService: SharedService
    ) {}

    ngOnInit(): void {
        this.effectivenessTable = this._sharedService.getEffectiveness();

        this.tableKeys = Object.keys(this._sharedService.getEffectiveness());
        console.log(this.tableKeys);
    }

    getTypeEffectiveness(key: string, index: any) {
        //console.log("CHECK: " + key);
        //console.log(this.effectivenessTable[index].SUPPER_EFFECTIVE);
        if(this.effectivenessTable[index].SUPPER_EFFECTIVE.includes(key))
            return 2;
        else if (this.effectivenessTable[index].NOT_EFFECTIVE.includes(key))
            return 0.5;
        else if (this.effectivenessTable[index].IMMUNITY.includes(key))
            return 0;
        else 
            return 1;
    }
    
  }
  