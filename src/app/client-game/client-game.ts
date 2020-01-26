import { Canvas } from './canvas/canvas';
import { WebsocketService } from '../socket/websocket';
import { State } from '@game-lib-shared/state/state';


export class ClientGame {
  private canvas: Canvas;
  private state: State;

  constructor(
    private canvasElement: HTMLCanvasElement,
    private socketService: WebsocketService
  ) {
    this.canvas = new Canvas(this.canvasElement);
    this.state = new State();

    this.socketService.listenServer().subscribe((recievedState: State) => {
      this.state = recievedState;
    });
  }


  public createGame() {
    this.renderScreen();
  }

  private renderScreen = () => {
    this.canvas.clearCanvas();
    // create players and passagers on screen

    this.state.players.forEach(p => {
      const localPlayer = p.id === this.socketService.id;
      this.canvas.setPlayerInCanvas(p.positionX, p.positionY, localPlayer);
    });

    this.state.passagers.forEach(p => {
      this.canvas.setPassagerInCanvas(p.positionX, p.positionY, p.type);
    });

    requestAnimationFrame(this.renderScreen);
  }
}
