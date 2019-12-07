import { Player } from 'src/app/player/player';
import { Position } from '../../common/position';
import { IPerson } from 'src/app/people/common/IPerson';

const font = 'FontAwesome';
const iconSize = 15;
const typeScreen = '2d';
const widthScreen = 500;
const heightScreen = 350;

export class Canvas {
  public context: CanvasRenderingContext2D;

  constructor(canvasElement: HTMLCanvasElement) {
    this.StartCanvasConfiguration(canvasElement);
    this.createContext(canvasElement);
  }

  public getIconSize(): number {
    return iconSize;
  }

  public clearCanvas = () => {
    this.context.clearRect(0, 0, widthScreen, heightScreen);
  }

  public StartCanvasConfiguration = (canvasElement: HTMLCanvasElement) => {
    canvasElement.width = widthScreen;
    canvasElement.height = heightScreen;
  }

  public createContext = (canvasElement: HTMLCanvasElement) => {
    this.context = canvasElement.getContext(typeScreen);
    this.context.font = `${iconSize}px ${font}`;
  }

  public getRandomPosition = (): Position => {
    const X_coord = Math.floor(Math.random() * (widthScreen - 10));
    const Y_coord = Math.floor(Math.random() * heightScreen);
    const position: Position = {
      X: (X_coord < 7.5) ? 7.5 : X_coord,
      Y: (Y_coord < 7.5) ? 7.5 : Y_coord
    };

    return position;
  }

  public setPlayerInCanvas = (player: Player) => {
    this.context.fillStyle = 'yellow';
    this.context.fillText(player.icon, player.position.X, player.position.Y);
  }

  public setPersonInCanvas = (person: IPerson) => {
    this.context.fillStyle = '#ccc';
    this.context.fillText(person.icon, person.position.X, person.position.Y);
  }
}
