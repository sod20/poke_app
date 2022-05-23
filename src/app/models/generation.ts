import { GEN } from "./pokemon";

export class Generation {

    constructor() {
        
    }

    public getGeneration(generation: number = GEN.ONE): number[] {
        const gen: Array<number> = [];

        const startCount = () => {
            switch(generation) {
                case GEN.TWO:
                    return GEN.ONE + 1;
                case GEN.THREE:
                    return GEN.TWO + 1;
                default:
                    return 1;
                }
        }

        for (let i = startCount(); i <= generation; i++) { gen.push(i);}
        return gen;
    }
}