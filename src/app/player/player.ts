import { Position } from '../common/position';

export class Player {
  public name = '';
  public id = '';
  public speed = 5;
  public points = 0;

  position: Position = {
    X: 0,
    Y: 0
  };

  public icon = '\uf1ba';

  constructor() { }
}
