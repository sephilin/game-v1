import { Player } from 'src/app/player/player';
import { Game } from 'src/app/game/game';
import { KeyDownHandler } from '../handler/keyDownHandler';
import { CollisionHandler } from '../handler/collisionHandler';
import { IPerson } from 'src/app/people/common/IPerson';
import { Male } from 'src/app/people/male';
import { Female } from 'src/app/people/female';


export class LocalGame extends Game {

  constructor(public player: Player,
    elementHTMLCanvas: HTMLCanvasElement,
    private keydownHandler: KeyDownHandler,
    collisionHandler: CollisionHandler) {
    super(elementHTMLCanvas, collisionHandler);
    this.players.push(player);
  }

  public createGame() {

    this.keydownHandler.keyDownListener.subscribe((command: { direction: string, player?: Player }) => {
      if (this[command.direction]) {
        this[command.direction](command.player);
      }
    });

    this.renderScreen();
    this.populateScreen(5000);

  }

  private renderScreen = () => {
    this.canvas.clearCanvas();

    this.players.forEach(p => {
      this.canvas.setPlayerInCanvas(p);
    });

    this.people.forEach(p => {
      this.canvas.setPersonInCanvas(p);
    });

    requestAnimationFrame(this.renderScreen);
  }


  // ###################################

  private populateScreen = (interval: number) => {
    setInterval(() => {
      this.people.push(this.getNewPerson());
    }, interval);

  }

  private getNewPerson = (): IPerson => {
    let people: IPerson;

    if (Math.round(Math.random()) === 1) {
      people = new Male();
    } else {
      people = new Female();
    }

    people.position = this.canvas.getRandomPosition();
    return people;
  }
}
