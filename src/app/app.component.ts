import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { KeyDownHandler } from './local/handler/keyDownHandler';
import { Player } from './player/player';
import { LocalGame } from './local/game/localGame';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('gameCanvas') gameCanvas: ElementRef;
  public game: LocalGame;

  private get elementHTMLCanvas(): HTMLCanvasElement {
    return this.gameCanvas.nativeElement as HTMLCanvasElement;
  }

  constructor(private eventHandler: KeyDownHandler) { }

  ngOnInit(): void {

    let player = new Player();

    player = new Player();
    player.name = 'Vitor';
    player.position = {
      X: 50,
      Y: 50
    };

    this.game = new LocalGame(player, this.elementHTMLCanvas);
    this.game.createGame();
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    const player = this.game.player as Player;
    this.eventHandler.keyDownEvent({ direction: event.key, player: player });
  }
}
