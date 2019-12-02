import { Position } from './position';

export class Player {
  public name = '';
  public id = 0;
  public speed = 5;

  position: Position = {
    X: 0,
    Y: 0
  };

  public icon = '\uf1b9';

  constructor() { }
}
