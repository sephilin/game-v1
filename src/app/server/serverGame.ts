import { Game } from "../game/game";
import { Player } from "../player/player";

export class serverGame extends Game {      

    constructor(elementHTMLCanvas : HTMLCanvasElement) {
        super(elementHTMLCanvas);        
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