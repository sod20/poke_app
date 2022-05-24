import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })

export class SharedService {

    private obsGeneration$ = new Subject<number>();
    currentGeneration$ = this.obsGeneration$.asObservable();

    constructor() { }

    setCurrentGeneration(generation: number) {
        this.obsGeneration$.next(generation);
    }
}