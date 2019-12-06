import { Player } from '../player/player';
import { Canvas } from '../local/canvas/canvas';

export class Game { 
  public canvas: Canvas;
  public players: Array<Player> = [];

  constructor(public canvasElement: HTMLCanvasElement) {
    this.canvas = new Canvas(this.canvasElement); 
  }
}
