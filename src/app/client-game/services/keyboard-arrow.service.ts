import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class KeyboardArrowService {

    arrowObservable: Observable<string>;

    constructor() {
        this.arrowObservable = new EventEmitter<string>();
    }
}
