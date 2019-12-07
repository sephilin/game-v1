import { Injectable } from '@angular/core';
import { IPerson } from 'src/app/people/common/IPerson';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {
  private audio = new Audio();

  constructor() {
  }

  public launchSound = (person: IPerson) => {
    this.playSound(person);
  }

  private playSound = (person: IPerson) => {
    this.audio.src = `../assets/${this.getRandomSoundName(person.sounds)}.wav`;
    this.audio.load();
    this.audio.play();
  }
  private getRandomSoundName = (sounds: Array<string>): string => {
    const number = Math.floor((Math.random() * 4));
    console.log(number);
    return sounds[number];
  }
}
