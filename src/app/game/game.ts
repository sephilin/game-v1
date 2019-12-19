import { EventHandler } from 'src/app/common/handlerEvent/handlerEvent';
import { Player } from '../player/player';
import { Canvas } from '../local/canvas/canvas';
import { Male } from '../people/male';
import { Female } from '../people/female';
import { IPerson } from '../people/common/IPerson';

export class Game {
  public canvas: Canvas;
  public players: Array<Player> = [];
  public people: Array<IPerson | Male | Female> = [];

  constructor(public canvasElement: HTMLCanvasElement, private eventHandler?: EventHandler) {
    this.canvas = new Canvas(this.canvasElement);
  }

  private validateCollision() {
    this.players.forEach(player => {
      this.people.forEach(people => {
        const d = this.CalcDistance(player.position.X, player.position.Y, people.position.X, people.position.Y);
        if (d <= this.canvas.getIconSize() / 2) {
          this.eventHandler.emit('OnCollision', people);
          this.people = this.people.filter(p => p.id !== people.id);
        }
      });
    });
  }

  public MovePlayerUp = (player: Player) => {
    player.position.Y -= ((player.position.Y - player.speed) >= 10) ? player.speed : 0;
    this.validateCollision();
  }

  public MovePlayerDown = (player: Player) => {
    player.position.Y += ((player.position.Y + player.speed) <= this.canvasElement.height) ? player.speed : 0;
    this.validateCollision();
  }

  public MovePlayerLeft = (player: Player) => {
    player.position.X -= ((player.position.X - player.speed) >= 0) ? player.speed : 0;
    this.validateCollision();
  }

  public MovePlayerRight = (player: Player) => {
    player.position.X += ((player.position.X + player.speed) < (this.canvasElement.width - 10)) ? player.speed : 0;
    this.validateCollision();
  }

  private CalcDistance = (x1, y1, x2, y2) => {
    const dist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    return this.round(dist);
  }

  private round = (x) => {
    return Math.round(x * 10) / 10;
  }

}
