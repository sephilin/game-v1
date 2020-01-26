import { SoundsService } from './../../sounds/sounds.service';
import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '@game-lib-shared/state/state';
import { Player } from '@game-lib-shared/player/player';
import { WebsocketService } from 'src/app/socket/websocket';
import { KeyboardArrowService } from '../../services/keyboard-arrow.service';
import { ClientGame } from '../../client-game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('game-state-observable') stateObservable: Observable<State>;
  @ViewChild('canvas', { static: true }) HTMLCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('gameMessage', { static: true }) gameMessage: ElementRef<HTMLDivElement>;

  public player: Player = {
    points: 0
  } as Player;

  constructor(private keyboardArrowService: KeyboardArrowService,
              private socketService: WebsocketService,
              private soundsService: SoundsService) { }

  ngOnInit() {
    const game = new ClientGame(this.HTMLCanvas.nativeElement, this.socketService);

    this.socketService.listenServer().subscribe((state: State) => {
      this.player = state.players.find(p => p.id === this.socketService.id);
    });

    game.createGame();
    this.soundsService.playBackgroundSound();
  }

  private emitArrowKeyPressed = (key: string) => {
    (this.keyboardArrowService.arrowObservable as EventEmitter<string>).emit(key);
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    const key = event.key;
    this.socketService.onMove(key);
    this.emitArrowKeyPressed(key);
  }
}
