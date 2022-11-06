import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { 
    SUPPER_EFFECTIVE,
    NOT_EFFECTIVE,
    IMMUNITY,
    TYPE_BUG,
    TYPE_DARK,
    TYPE_DRAGON,
    TYPE_ELECTRIC,
    TYPE_FAIRY,
    TYPE_FIRE,
    TYPE_FIGHTING,
    TYPE_FLYING,
    TYPE_GHOST,
    TYPE_GRASS,
    TYPE_GROUND,
    TYPE_NORMAL,
    TYPE_ICE,
    TYPE_POISON,
    TYPE_PSYCHIC,
    TYPE_ROCK,
    TYPE_STEEL,
    TYPE_WATER
} from '../constants/types.constants';

@Injectable({
    providedIn: 'root',
  })

export class SharedService {

    private types = {
        0: TYPE_NORMAL,
        1: TYPE_FIGHTING,
        2: TYPE_FLYING,
        3: TYPE_POISON,
        4: TYPE_GROUND,
        5: TYPE_ROCK,
        6: TYPE_BUG,
        7: TYPE_GHOST,
        8: TYPE_STEEL,
        9: TYPE_FIRE,
        10: TYPE_WATER,
        11: TYPE_GRASS,
        12: TYPE_ELECTRIC,
        13: TYPE_PSYCHIC,
        14: TYPE_ICE,
        15: TYPE_DRAGON,
        16: TYPE_DARK,
        17: TYPE_FAIRY
    };
    
    private efectiveness = [
        {
            TYPE: TYPE_NORMAL,
            SUPPER_EFFECTIVE: [],
            NOT_EFFECTIVE: [TYPE_ROCK, TYPE_STEEL],
            IMMUNITY: [TYPE_GHOST]
        },
        {
            TYPE: TYPE_FIGHTING,
            SUPPER_EFFECTIVE: [TYPE_NORMAL, TYPE_ICE, TYPE_ROCK, TYPE_DARK, TYPE_STEEL],
            NOT_EFFECTIVE: [TYPE_FLYING, TYPE_POISON, TYPE_BUG, TYPE_PSYCHIC],
            IMMUNITY: [TYPE_GHOST]
        },
        {
            TYPE: TYPE_FLYING,
            SUPPER_EFFECTIVE: [TYPE_FIGHTING, TYPE_BUG, TYPE_GRASS],
            NOT_EFFECTIVE: [TYPE_ELECTRIC, TYPE_ROCK, TYPE_STEEL],
            IMMUNITY: []
        },
        {
            TYPE: TYPE_POISON,
            SUPPER_EFFECTIVE: [TYPE_GHOST, TYPE_FAIRY],
            NOT_EFFECTIVE: [TYPE_POISON, TYPE_GROUND, TYPE_ROCK, TYPE_GHOST],
            IMMUNITY: [TYPE_STEEL]
        },
        {
            TYPE: TYPE_GROUND,
            SUPPER_EFFECTIVE: [TYPE_POISON, TYPE_ROCK, TYPE_STEEL, TYPE_FIRE, TYPE_ELECTRIC],
            NOT_EFFECTIVE: [TYPE_BUG, TYPE_GRASS],
            IMMUNITY: [TYPE_FLYING]
        },
        {
            TYPE: TYPE_ROCK,
            SUPPER_EFFECTIVE: [TYPE_FLYING, TYPE_BUG, TYPE_FIRE, TYPE_ICE],
            NOT_EFFECTIVE: [TYPE_FIGHTING, TYPE_GROUND, TYPE_STEEL],
            IMMUNITY: []
        },
        {
            TYPE: TYPE_BUG,
            SUPPER_EFFECTIVE: [TYPE_GRASS, TYPE_PSYCHIC, TYPE_DARK],
            NOT_EFFECTIVE: [TYPE_FIGHTING, TYPE_FLYING, TYPE_POISON, TYPE_GHOST, TYPE_STEEL, TYPE_FIGHTING, TYPE_FAIRY],
            IMMUNITY: []
        },
        {
            TYPE: TYPE_GHOST,
            SUPPER_EFFECTIVE: [TYPE_GHOST, TYPE_PSYCHIC],
            NOT_EFFECTIVE: [TYPE_DARK],
            IMMUNITY: [TYPE_NORMAL]
        },
        {
            TYPE: TYPE_STEEL,
            SUPPER_EFFECTIVE: [TYPE_ICE, TYPE_ROCK, TYPE_FAIRY],
            NOT_EFFECTIVE: [TYPE_STEEL, TYPE_FIRE, TYPE_WATER, TYPE_ELECTRIC],
            IMMUNITY: []
        },
        {
            TYPE: TYPE_FIRE,
            SUPPER_EFFECTIVE: [TYPE_BUG, TYPE_STEEL, TYPE_GRASS, TYPE_ICE],
            NOT_EFFECTIVE: [TYPE_ROCK, TYPE_FIRE, TYPE_WATER, TYPE_DRAGON],
            IMMUNITY: []
        },
        {
            TYPE: TYPE_WATER,
            SUPPER_EFFECTIVE: [TYPE_GROUND, TYPE_ROCK, TYPE_FIRE],
            NOT_EFFECTIVE: [TYPE_WATER, TYPE_GRASS, TYPE_DRAGON],
            IMMUNITY: []
        },
        {
            TYPE: TYPE_GRASS,
            SUPPER_EFFECTIVE: [TYPE_GROUND, TYPE_ROCK, TYPE_WATER],
            NOT_EFFECTIVE: [TYPE_FLYING, TYPE_POISON, TYPE_BUG, TYPE_STEEL, TYPE_FIRE, TYPE_GRASS, TYPE_DRAGON],
            IMMUNITY: []
        },
        {
            TYPE: TYPE_ELECTRIC,
            SUPPER_EFFECTIVE: [TYPE_FLYING, TYPE_WATER],
            NOT_EFFECTIVE: [TYPE_GRASS, TYPE_ELECTRIC, TYPE_DRAGON],
            IMMUNITY: [TYPE_GROUND]
        },
        {
            TYPE: TYPE_PSYCHIC,
            SUPPER_EFFECTIVE: [TYPE_FIGHTING, TYPE_POISON],
            NOT_EFFECTIVE: [TYPE_STEEL, TYPE_PSYCHIC],
            IMMUNITY: [TYPE_DARK]
        },
        {
            TYPE: TYPE_ICE,
            SUPPER_EFFECTIVE: [TYPE_FLYING, TYPE_GROUND, TYPE_GRASS, TYPE_DRAGON],
            NOT_EFFECTIVE: [TYPE_STEEL, TYPE_FIRE, TYPE_WATER, TYPE_ICE],
            IMMUNITY: []
        },
        {
            TYPE: TYPE_DRAGON,
            SUPPER_EFFECTIVE: [TYPE_DRAGON],
            NOT_EFFECTIVE: [TYPE_STEEL],
            IMMUNITY: [TYPE_FAIRY]
        },
        {
            TYPE: TYPE_DARK,
            SUPPER_EFFECTIVE: [TYPE_GHOST, TYPE_PSYCHIC],
            NOT_EFFECTIVE: [TYPE_FIGHTING, TYPE_DARK, TYPE_FAIRY],
            IMMUNITY: []
        },
        {
            TYPE: TYPE_FAIRY,
            SUPPER_EFFECTIVE: [TYPE_DRAGON, TYPE_FIGHTING, TYPE_DARK],
            NOT_EFFECTIVE: [TYPE_POISON, TYPE_STEEL, TYPE_FIRE],
            IMMUNITY: []
        }
    ];
    private obsGeneration$ = new Subject<number>();
    currentGeneration$ = this.obsGeneration$.asObservable();

    constructor() {

    }

    setCurrentGeneration(generation: number) {
        this.obsGeneration$.next(generation);
    }

    getTypes() {
        return this.types;
    }

    getEffectiveness() {
        return this.efectiveness;
    }

    getType(type:string) {
        switch (type) {
            case TYPE_BUG:
                return TYPE_BUG;
            default:
                console.log(type);
                
                return TYPE_NORMAL;
        }
    }
}