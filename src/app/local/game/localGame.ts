import { Player } from 'src/app/player/player';
import { Game } from 'src/app/game/game';
import { IPerson } from 'src/app/people/common/IPerson';
import { Male } from 'src/app/people/male';
import { Female } from 'src/app/people/female';
import { EventHandler } from 'src/app/common/handlerEvent/handlerEvent';
import { Command } from 'src/app/common/command';

const OnArrowUp = 'ArrowUp';
const OnArrowDown = 'ArrowDown';
const OnArrowLeft = 'ArrowLeft';
const OnArrowRight = 'ArrowRight';

export class LocalGame extends Game {

  commandsKeyboard: Array<Command> = [
    new Command(OnArrowUp, () => { this.MovePlayerUp(this.player); }),
    new Command(OnArrowDown, () => { this.MovePlayerDown(this.player); }),
    new Command(OnArrowLeft, () => { this.MovePlayerLeft(this.player); }),
    new Command(OnArrowRight, () => { this.MovePlayerRight(this.player); })
  ];

  constructor(public player: Player,
    elementHTMLCanvas: HTMLCanvasElement,
    private evtHandler: EventHandler) {
    super(elementHTMLCanvas, evtHandler);

    this.players.push(player);
    this.commandsKeyboard.forEach(command => this.evtHandler.registerEvent(command));
  }

  public createGame() {
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
