import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { Game } from './game/game';
import { KeyDownHandler } from './local/handler/keyDownHandler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('gameCanvas') gameCanvas: ElementRef;
  public game: Game;

  private get elementHTMLCanvas(): HTMLCanvasElement {
    return this.gameCanvas.nativeElement as HTMLCanvasElement;
  }

  constructor(private eventHandler: KeyDownHandler) { }

  ngOnInit(): void {
    this.game = new Game(this.elementHTMLCanvas);
    this.game.createGame();
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.game.movePlayer(event.key);
  }
}
