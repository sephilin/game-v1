import { Observable } from 'rxjs';
import { Player } from 'src/app/player/player';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollisionHandler {

  public colissionListener: Observable<any>;

  constructor() {
    this.colissionListener = new EventEmitter();
  }

  public collisionEvent(person: any) {
    (this.colissionListener as EventEmitter<any>).emit(person);
  }
}
