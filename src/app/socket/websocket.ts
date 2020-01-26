import { GameEvent } from './../../../../game-server/src/game-event/game-event';
import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '@game-lib-shared/state/state';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  // private url = 'http://localhost:3000';
  private url = 'https://ws-crazy-taxi.herokuapp.com';
  private socket;
  public id;

  constructor() {
    this.socket = io(this.url);
    this.socket.on('connected', (playerId: string) => {
      this.id = playerId;
    });
  }

  public onMove(pressedKey: string) {
    this.socket.emit('move', new GameEvent('move', {
      playerId: this.id,
      key: pressedKey
    }));
  }

  // public onConfirm(command: Command) {
  //     command.type = TypeCommand.onConfirm;
  //     this.socket.emit('onConfirm', command);
  // }

  // public getInit = (): Observable<string> => {
  //     return Observable.create((observer) => {
  //         // this.socket.on('onInit', (config: GameConfig) => {
  //         //     observer.next(config);
  //         // });
  //     });
  // }

  public listenServer = (): Observable<State> => {
    return new Observable((observer) => {
      this.socket.on('state', (state: State) => {
        observer.next(state);
      });
    });
  }
}
