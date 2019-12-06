import { Player } from "src/app/player/player";
import { Game } from "src/app/game/game";


export class LocalGame extends Game {

    constructor(public player: Player, elementHTMLCanvas : HTMLCanvasElement) {
        super(elementHTMLCanvas);
        this.players.push(player);
    }

    public createGame() {
        this.renderScreen();
    }

    private renderScreen = () => {
        this.canvas.clearCanvas();
        this.players.forEach(p => {
            this.canvas.setElementInCanvas(p);
        });

        requestAnimationFrame(this.renderScreen);
    }

    public movePlayer(direction: string, player: Player = this.player) {
        this[direction](player);
    }
}
