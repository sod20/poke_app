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
    effectsTable:any;

    constructor(
        private _sharedService: SharedService
    ) {}

    ngOnInit(): void {
        this.effectivenessTable = this._sharedService.getEffectiveness();
        this.tableKeys = Object.keys(this._sharedService.getEffectiveness());
        let effectivenessTableData = [];
        let tableIndex = 0;
        for(let key of this.effectivenessTable) {
            let effectTable = []
            for (let index of this.tableKeys) {
                effectTable.push(this.getTypeEffectiveness(key.TYPE, index));
            }
            effectivenessTableData.push({key: key.TYPE, effectiveness: effectTable});
            tableIndex++;
        }
        console.log(effectivenessTableData);

        let invertedTable = [];
        for(let row = 0 ; row < Object.keys(effectivenessTableData).length; row++) {
            let auxTable = [];
            for(let col = 0 ; col < Object.keys(effectivenessTableData).length; col++) {
                auxTable.push(effectivenessTableData[col].effectiveness[row]);
            }
            invertedTable.push({key: effectivenessTableData[row].key, values: auxTable});
        }
        console.log(invertedTable);
        this.effectsTable = invertedTable;
    }

    getTypeEffectiveness(key: string, index: any) {
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
  