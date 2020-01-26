import { ScreenConfiguration } from '@game-lib-shared/core/constants/constants';

const font = 'FontAwesome';
const typeScreen = '2d';

export class Canvas {
  public context: CanvasRenderingContext2D;

  constructor(canvasElement: HTMLCanvasElement) {
    this.StartCanvasConfiguration(canvasElement);
    this.createContext(canvasElement);
  }


  public clearCanvas = () => {
    this.context.clearRect(0, 0, ScreenConfiguration.width, ScreenConfiguration.height);
  }

  public StartCanvasConfiguration = (canvasElement: HTMLCanvasElement) => {
    canvasElement.width = ScreenConfiguration.width;
    canvasElement.height = ScreenConfiguration.height;
  }

  public createContext = (canvasElement: HTMLCanvasElement) => {
    this.context = canvasElement.getContext(typeScreen);
    this.context.font = `${ScreenConfiguration.iconSize}px ${font}`;
  }

  public getMousePosition(canvasElement: HTMLCanvasElement, event: any) {
    const rect = canvasElement.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  public setPlayerInCanvas = (X: number, Y: number, localPlayer: boolean) => {
    this.context.fillStyle = localPlayer ? 'yellow' : 'black';
    this.context.fillText(ScreenConfiguration.iconPlayer, X, Y);
  }

  public setPassagerInCanvas = (X: number, Y: number, type: number) => {
    const icon = type === 1 ? ScreenConfiguration.iconPassagerFemale : ScreenConfiguration.iconPassagerMale;
    this.context.fillStyle = type === 1 ? '#ed6077' : '#3cc2ef';
    this.context.fillText(icon, X, Y);
  }
}
