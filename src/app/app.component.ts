import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { Player } from './player/player';
import { SoundsService } from './local/sounds/sounds';
import { EventHandler } from './common/handlerEvent/handlerEvent';
import { Command } from './common/command';
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

  constructor(private soundsService: SoundsService,
    private evtHandler: EventHandler
  ) { }

  ngOnInit(): void {

    let player = new Player();

    player = new Player();
    player.name = 'Vitor';
    player.position = {
      X: 50,
      Y: 50
    };

    this.evtHandler.registerEvent(new Command('OnCollision', this.launchSounds));

    this.game = new LocalGame(player, this.elementHTMLCanvas, this.evtHandler);
    this.game.createGame();
  }

  private launchSounds = (person) => {
    this.soundsService.launchSound(person);
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.evtHandler.emit(event.key);
  }
}
