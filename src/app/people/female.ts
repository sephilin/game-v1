import { Position } from '../common/position';
import { IPerson } from './common/IPerson';

export class Female implements IPerson {
  public id = '';
  public sounds: Array<string> = [
    'female_go',
    'female_gotit',
    'female_great',
    'female_wow'
  ];

  position: Position = {
    X: 0,
    Y: 0
  };

  public icon = '\uf182';

  constructor() {
    this.id = '_' + Math.random().toString(36).substr(2, 9);
  }
}
