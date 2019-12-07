
import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { KeyDownHandler } from './local/handler/keyDownHandler';
import { Player } from './player/player';
import { LocalGame } from './local/game/localGame';
import { CollisionHandler } from './local/handler/collisionHandler';
import { SoundsService } from './local/sounds/sounds';
import { ServerGame } from './server/serverGame';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('gameCanvas') gameCanvas: ElementRef;
  @ViewChild('gameSongs') gameSongs: ElementRef;

  public game: LocalGame;

  private get elementHTMLCanvas(): HTMLCanvasElement {
    return this.gameCanvas.nativeElement as HTMLCanvasElement;
  }

  private get elementHTMLAudio(): HTMLAudioElement {
    return this.gameSongs.nativeElement as HTMLAudioElement;
  }

  public get volume(): string {
    return (this.elementHTMLAudio.volume).toFixed(2);
  }

  constructor(private eventHandler: KeyDownHandler,
    private collisionHandler: CollisionHandler,
    private soundsService: SoundsService
  ) { }

  ngOnInit(): void {

    let player = new Player();

    player = new Player();
    player.name = 'Vitor';
    player.position = {
      X: 50,
      Y: 50
    };

    this.collisionHandler.colissionListener.subscribe((person) => {
      this.soundsService.launchSound(person);
    });

    this.elementHTMLAudio.addEventListener('ended', this.loop, false);

    this.game = new LocalGame(player, this.elementHTMLCanvas, this.eventHandler, this.collisionHandler);
    this.game.createGame();
  }



  public VolumeUp() {
    if (Number.parseFloat(this.elementHTMLAudio.volume.toFixed(2)) < 1) {
      this.elementHTMLAudio.volume += 0.05;
    }
  }

  public VolumeDown() {
    if (Number.parseFloat(this.elementHTMLAudio.volume.toFixed(2)) > 0.05) {
      this.elementHTMLAudio.volume -= 0.05;
    }
  }

  public AudioOff() {
    this.elementHTMLAudio.pause();
  }

  public AudioOn() {
    this.loop();
  }

  private loop = () => {
    this.elementHTMLAudio.play();
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    const player = this.game.player as Player;
    const command = { direction: event.key, player: player };
    this.eventHandler.keyDownEvent(command);
  }
}
