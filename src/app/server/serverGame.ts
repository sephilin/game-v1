import { Game } from '../game/game';
import { IPerson } from '../people/common/IPerson';
import { Male } from '../people/male';
import { Female } from '../people/female';
import { Player } from '../player/player';

export class ServerGame extends Game {

  constructor(elementHTMLCanvas: HTMLCanvasElement) {
    super(elementHTMLCanvas);
  }

  public gameStart = (players: Array<Player>,
    people: Array<IPerson | Male | Female>) => {

    this.people = people;
    this.players = players;

    this.populateScreen(5000);
  }

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
