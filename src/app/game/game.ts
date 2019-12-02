import { Player } from '../player/player';
import { Canvas } from '../local/canvas/canvas';

export class Game {
  private localPlayer: Player;
  private players: Array<Player>;
  private canvas: Canvas;

  constructor(private canvasElement: HTMLCanvasElement) {
    this.canvas = new Canvas(this.canvasElement);
    this.players = new Array<Player>();
  }

  public createGame = () => {

    this.localPlayer = new Player();
    this.localPlayer.name = 'Vitor';
    this.localPlayer.position = {
      X: 50,
      Y: 50
    };

    this.players.push(this.localPlayer);

    this.renderScreen();
  }

  public ConnectPlayer = (newPlayer: Player) => {
    if (!this.players.some(p => p.id === newPlayer.id)) {
      this.players.push(newPlayer);
    }
  }

  public DisconnectPlayer = (currentPlayer: Player) => {
    if (this.players.some(p => p.id === currentPlayer.id)) {
      this.players = this.players.filter(p => p.id !== currentPlayer.id);
    }
  }

  public movePlayer(direction: string, player: Player = this.localPlayer) {
    this[direction](this.players.find(p => p.id === player.id));
  }

  private renderScreen = () => {
    this.canvas.clearCanvas();
    this.players.forEach(p => {
      this.canvas.setElementInCanvas(p);
    });

    requestAnimationFrame(this.renderScreen);
  }

  private ArrowUp = (player: Player) => {
    player.position.Y -= ((player.position.Y - player.speed) >= 10) ? player.speed : 0;
  }

  private ArrowDown = (player: Player) => {
    player.position.Y += ((player.position.Y + player.speed) <= this.canvasElement.height) ? player.speed : 0;
  }

  private ArrowLeft = (player: Player) => {
    player.position.X -= ((player.position.X - player.speed) >= 0) ? player.speed : 0;
  }

  private ArrowRight = (player: Player) => {
    player.position.X += ((player.position.X + player.speed) < (this.canvasElement.width - 10)) ? player.speed : 0;
  }
}
