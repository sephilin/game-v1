import { Player } from 'src/app/player/player';

const font = 'FontAwesome';
const iconSize = 10;
const typeScreen = '2d';
const widthScreen = 500;
const heightScreen = 350;

export class Canvas {
  public context: CanvasRenderingContext2D;

  constructor(canvasElement: HTMLCanvasElement) {
    this.StartCanvasConfiguration(canvasElement);
    this.createContext(canvasElement);
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
    this.context.font = `${10}px ${font}`;
  }

  public setElementInCanvas = (player: Player) => {
    this.context.fillText(player.icon, player.position.X, player.position.Y);
  }
}
