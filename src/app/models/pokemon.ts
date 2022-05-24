export interface Pokemon {
    id:number;
    name:string;
    type:[string];
    abilities:[Abilities];
    sprites?:Sprite;
    types?:[Type];
}

export interface Abilities {
    ability:Ability;
    is_hidden: boolean;
    slot: number
}

export interface Ability {
    name: string;
    url: string;
}

export interface Sprite {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
}

export interface Type {
    slot: number;
    type : {
        name: string;
        url: string;
    }
}

export enum GEN {
    ONE = 151,
    TWO = 251,
    THREE = 386,
    FOUR = 493,
    FIVE = 649,
    SIX = 721,
    SEVEN = 809
};
