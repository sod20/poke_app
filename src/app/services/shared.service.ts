import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })

export class SharedService {

    private obsGeneration$ = new BehaviorSubject<any>({});
    currentGeneration$ = this.obsGeneration$.asObservable();

    constructor() { }

    setCurrentGeneration(generation: number) {
        this.obsGeneration$.next(generation);
    }
}