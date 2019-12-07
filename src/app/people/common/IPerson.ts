import { Position } from '../../common/position';

export interface IPerson {
  position: Position;
  icon: string;
  id: string;
  sounds: Array<string>;
}
