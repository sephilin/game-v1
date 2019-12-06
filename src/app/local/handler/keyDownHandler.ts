import { Observable } from 'rxjs';
import { Player } from 'src/app/player/player';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyDownHandler {

  public keyDownListener: Observable<{ direction: string, player?: Player }>;

  constructor() {
    this.keyDownListener = new EventEmitter();
  }

  public keyDownEvent(command: { direction: string, player?: Player }) {   
    (this.keyDownListener as EventEmitter<{ direction: string, player?: Player }>).emit(command);
  }
}
