import { Position } from '../common/position';
import { IPerson } from './common/IPerson';

export class Male implements IPerson {
  public id = '';
  public sounds: Array<string> = [
    'male_go',
    'male_gotit',
    'male_great',
    'male_wow'
  ];

  position: Position = {
    X: 0,
    Y: 0
  };

  public icon = '\uf183';

  constructor() {
    this.id = '_' + Math.random().toString(36).substr(2, 9);
  }
}
